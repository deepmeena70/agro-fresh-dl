import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
// component
import PrimaryHeader from '../components/PrimaryHeader'

import firestore from '@react-native-firebase/firestore'

import {addToCart} from '../features/cart';

import {useDispatch} from 'react-redux';

export default function FreshBasketScreen({route, navigation}) {

    const dispatch = useDispatch();

    const initialArray = [];

    const [bucket, setBucket] = useState(initialArray);

    const [last, setLast] = useState();
    const [loading, setLoading] = useState(false);

    const [loadingFailed, setLoadingFailed] = useState(false);

    const fetchBucket = async () => {
        console.log('fetch veg regular')
        setLoading(true)

        try{
            const productsRef = firestore()
            .collection('freshBasket')

            const docLength = await productsRef
            .orderBy('productName')
            .get();

            console.log("fresh Basket >>>",docLength.docs.length);

            const first = productsRef
            .orderBy('productName')
            .limit(5); 
            
            const snapshot = await first 
            .get();
        
            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            setLast(lastQuery);

            snapshot.forEach(doc => {
                setBucket((oldArray) => [...oldArray, doc.data()] )
            })

            if(snapshot.empty){
                console.log("fresh basket >>>",'products not found in basket')
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
            .collection('freshBasket')

        const next = productsRef
        .orderBy('productName')
        .startAfter(last.data().productName)
        .limit(5);

        try{
            const snapshot = await next.get()
            .catch(err => console.error(err.message));

            const lastQuery = snapshot.docs[snapshot.docs.length - 1];

            if(snapshot.empty) {
                console.log("Next collection is empty >>> Fresh Basket");
                setLoading(false)
            } else {
                snapshot.forEach(doc => {
                    setBucket((oldArray) => [...oldArray, doc.data()] )
                })
            }
          
            setLast(lastQuery);

            setLoading(false)
        
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        setBucket([])
        fetchBucket()
    }, [route.name]);

    const [selectedValue, setSelectedValue] = useState();

    const handleBuy = (item) => {
        console.log('item name =>',item.productName);
        dispatch(addToCart(item, selectedValue));
    }

    return (
        <View style={styles.container}>
            <PrimaryHeader navigation={navigation}/>
            <ScrollView style={ styles.mainProductContainer }
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
                {
                    bucket.map((item, key) => {
                        return <View key={key} style={styles.card}>
                                <View style={styles.productContainer}>
                                    <Image 
                                        source={{ uri:'https://imgcdn.floweraura.com/fruitilicious-basket-9932240co.jpg' }}
                                        style={ styles.thumbnail }
                                    />
                                    <View style={styles.productDescription}>
                                        <Text style={ styles.prodTitle }>{item.productName}</Text>
                                        <View style={ styles.priceContainer }>
                                            <Text style={ styles.rate }>₹ {item.sellingPrice}/unit</Text>
                                        </View>
                                        <View style={ styles.basketContent }>
                                            <Text style={ styles.basketContentText}>
                                                {item.bucketItems.toString().replace(/,/g,"+")}
                                            </Text>
                                        </View>
                                  
                                    </View>
                                    <View>
                                        {
                                        (item.bucketQty > 0) ?
                                        <Button 
                                        mode="contained" 
                                        onPress={() => {handleBuy(item)}}
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
                    })
                }

{
            (loading === true)?
            <ActivityIndicator style={{ marginTop:12 }} size="small" color="#37c4ad" />
            :
            null
        }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    mainProductContainer:{
        flex:1,
        paddingLeft:12,
        paddingRight:6
    },
    productContainer:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    card:{
        marginTop:12,
        height:120,
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
        flex:.95, 
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
        fontSize:13.5,
        color: "#37c7ad" 
    },
    discountRate:{
        color:"#37c7ad", 
        paddingLeft:12, 
        fontSize:12
    },
    basketContent:{
        flex:1, 
        borderColor:"lightgrey", 
        width:140, 
        marginTop: 6,
    },
    basketContentText:{
        fontSize: 14
    },

}) 

