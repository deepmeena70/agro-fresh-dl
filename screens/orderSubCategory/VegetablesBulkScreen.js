import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

import {addToCart, cartSelector} from '../../features/cart';
import {useSelector, useDispatch} from 'react-redux';

import firestore from '@react-native-firebase/firestore';

export default function VegetablesBulkScreen({route, navigation}) {

    const dispatch = useDispatch();

    const initialArray = [];

    const [vegetable, setVegetable] = useState(initialArray);

    const [last, setLast] = useState();
    const [loading, setLoading] = useState(false);

    const [loadingFailed, setLoadingFailed] = useState(false);

    const fetchVeg = async () => {
        console.log('fetch veg regular')
        setLoading(true);

        try{
            const productsRef = firestore()
            .collection('products')

            const docLength = await productsRef
            .orderBy('productName')
            .where("regular", '==', true)
            .where('vegetable', '==', true).get();

            console.log("vegetable regular length>>>",docLength.docs.length);

            const first = productsRef
            .orderBy('productName')
            .where("bulk", '==', true)
            .where('vegetable', '==', true)
            .limit(5); 
            
            const snapshot = await first 
            .get();
        
            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            setLast(lastQuery);

            snapshot.forEach(doc => {
                setVegetable((oldArray) => [...oldArray, doc.data()] )
            })

            if(snapshot.empty){
                console.log("vegetables >>>",'products not found in regular')
                setLoading(false)
                return;
            }

            setLoading(false)


        } catch(e){
            console.error(e);
        }
    }


    const fetchNext = async (last) => {
        if(last === null || last === undefined) {
            return;
        }

        setLoading(true)

        const productsRef = firestore()
            .collection('products')

        const next = productsRef
        .orderBy('productName')
        .where("bulk", '==', true)
        .where('vegetable', '==', true)
        .startAfter(last.data().productName)
        .limit(5);

        try{
            const snapshot = await next.get()
            .catch(err => console.error(err.message));

            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            if(snapshot.empty) {
                console.log("Next collection is empty >>> vegetables Bulk");
                setLoading(false)
            } else {
                snapshot.forEach(doc => {
                    setVegetable((oldArray) => [...oldArray, doc.data()] )
                })
            }
          
            setLast(lastQuery);

            setLoading(false);
        
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchVeg()
    }, [route.name]);

    const {items} = useSelector(cartSelector);

    const [selectedValue, setSelectedValue] = useState();
    const pickerRef = useRef();



    console.log("route name and route params >>>",route, route.name)

    const handleBuy = (item) => {
        console.log('item name =>',item.productName);
        dispatch(addToCart(item, selectedValue));
    }


    return ( 
        <ScrollView onScroll={e => { 
            const maxOffset = Math.round(e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height);
            const yOffset = Math.round(e.nativeEvent.contentOffset.y)
            if(yOffset >= maxOffset) {
                console.log("scrolled")
                return fetchNext(last);
            }
          }}
          scrollEventThrottle={300} 
          style={styles.container}>
            {
                vegetable.map((product, key) => 

                    <View style={styles.card} key={key}>
                        <View style={styles.productContainer}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ProductDetails", {
                                    item:product
                                })
                            }}>
                                <Image 
                                    source={{ uri:product.imageURL }}
                                    style={ styles.thumbnail }
                                />
                            </TouchableOpacity>
                            <View style={styles.productDescription}>
                                <Text style={ styles.prodTitle }>{product.productName}</Text>
                                <View style={ styles.priceContainer }>
                                {
                                        (!product.discountPrice ?
                                            <Text style={{ fontSize:12,  }}>₹ {product.sellingPrice}/kg</Text> :
                                            <Text style={ styles.rate }>₹ {product.sellingPrice}/kg</Text>
                                               
                                        )
                                    }
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
                                <Text style={ styles.minimumQty }>Minimum Quantity {product.minOrderQty}kgs</Text>
                            </View>
                            <View>
                                {
                                   product.quantity > 0 ?
                                   <Button 
                                   mode="contained" 
                                   onPress={() => {handleBuy(product)}}
                                   color="#37c7ad"
                                   labelStyle={{ color:"#fff" }}
                                   >
                                       buy
                                   </Button>
                                   :
                                    <View>
                                        <Text style={{ color:'red' }}>Out of stock</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>

                    )
            }

        {
            (loading === true)?
            <ActivityIndicator style={{ marginTop:12 }} size="small" color="#37c4ad" />
            :
            null
        }
        
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
        width:120,
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
