import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

import {useDispatch} from 'react-redux';
import {addToCart, cartSelector} from '../../features/cart';

import firestore from '@react-native-firebase/firestore';

export default function FruitsScreen({route, navigation}) {
    const [selectedValue, setSelectedValue] = useState()
    const pickerRef = useRef();

    const dispatch = useDispatch();

    const initialArray = [];

    const [fruit, setFruit] = useState(initialArray);

    const [last, setLast] = useState();

    const fetchFruit = async () => {
        console.log('fetch fruit regular')

        try{
            const productsRef = firestore()
            .collection('products')

            const docLength = await productsRef
            .orderBy('productName')
            .where("regular", '==', true)
            .where('fruit', '==', true).get();

            console.log("fruit regular length>>>",docLength.docs.length);

            const first = productsRef
            .orderBy('productName')
            .where("regular", '==', true)
            .where('fruit', '==', true)
            .limit(5); 
            
            const snapshot = await first 
            .get();
        
            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            setLast(lastQuery);

            snapshot.forEach(doc => {
                setFruit((oldArray) => [...oldArray, doc.data()] )
            })

            if(snapshot.empty){
                console.log("fruits >>>",'products not found in regular')
                return;
            }


        } catch(e){
            console.error(e);
        }
    }


    const fetchNext = async (last) => {
        if(last === null || last === undefined) {
            return;
        }

        const productsRef = firestore()
            .collection('products')

        console.log("orderType >>>","regular")

        const next = productsRef
        .orderBy('productName')
        .where("regular", '==', true)
        .where('fruit', '==', true)
        .startAfter(last.data().productName)
        .limit(5);

        try{
            const snapshot = await next.get()
            .catch(err => console.error(err.message));

            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            if(snapshot.empty) {
                console.log("Next collection is empty >>> vegetables");
            } else {
                snapshot.forEach(doc => {
                    setFruit((oldArray) => [...oldArray, doc.data()] )
                })
            }
          
            setLast(lastQuery);
        
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchFruit()
    }, [route.name]);

    function open() {
    pickerRef.current.focus();
    }

    function close() {
    pickerRef.current.blur();
    }

    const handleBuy = (item) => {
        console.log('item name =>',item.productName);
        dispatch(addToCart(item, selectedValue));
    }
    
    return (
        <ScrollView style={styles.container}
        onScroll={e => { 
            const maxOffset = Math.round(e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height);
            const yOffset = Math.round(e.nativeEvent.contentOffset.y)
            if(yOffset >= maxOffset) {
                console.log("scrolled")
                fetchNext(last);
            }
          }}
          scrollEventThrottle={300} 

        >
             {fruit.map((product, key) => 

                <View key={key} style={styles.card}>
                    <View style={styles.productContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProductDetails",{item:product})}
                        >
                            <Image 
                                source={{ uri:product.imageURL }}
                                style={ styles.thumbnail }
                            />
                        </TouchableOpacity>
                        <View style={styles.productDescription}>
                            <Text style={ styles.prodTitle }>{product.productName}</Text>
                            <View style={ styles.priceContainer }>
                                <Text style={ styles.rate }>₹ {product.sellingPrice}/kg</Text>
                                <Text style = { styles.discountRate }>₹ {product.discountPrice}/kg</Text>
                            </View>
                            <View style={ styles.pickerContainer }>
                                <Picker
                                    ref={pickerRef}
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedValue(itemValue)
                                    }
                                    style={ styles.picker }
                                    >
                                        { product.packageOf.map((item, index)=>{
                                            return (
                                                <Picker.Item key={index} style={ styles.pickerItem } label={`${item} kg`} value={item} />
                                            )
                                        })}
                                </Picker>
                            </View>
                            <Text style={ styles.minimumQty }>
                                Minimum Quantity {product.minOrderQty}kgs
                            </Text>
                        </View>
                        <Button 
                        mode="contained" 
                        onPress={() => handleBuy(product)}
                        color="#37c7ad"
                        labelStyle={{ color:"#fff" }}
                        >
                            Buy
                        </Button>
                    </View>
                </View>


            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:12,
        paddingRight: 4
    },
    productContainer:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    card:{
        marginTop:12,
        height:110,
        width:"98%",
        backgroundColor:"white",
        borderRadius:1,
        padding:8,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1, 
    },
    thumbnail:{
        height:90, 
        width:100
    },productDescription:{
        flex:.94, 
        paddingLeft:12 
    },
    prodTitle:{
        fontSize: 18, 
        color:"#000"
    },
    priceContainer:{
        flexDirection: 'row', 
        paddingTop: 4
    },
    rate:{
        fontSize:12, 
        textDecorationLine:'line-through'
    },
    discountRate:{
        color:"#37c7ad", 
        paddingLeft:12, 
        fontSize:12
    },
    pickerContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1, 
        borderColor:"lightgrey", 
        width:120,
    },
    picker:{
        width:120
    },
    pickerItem:{
        fontSize:14, 
        color: "grey"
    },
    minimumQty:{
        color:'red', 
        fontSize:12, 
        paddingTop:4
    }
})
