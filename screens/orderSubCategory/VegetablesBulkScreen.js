import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

import {fetchRegVeg, vegetableSelector, fetchRegVegOnScroll} from '../../features/vegetable';
import {addToCart, cartSelector} from '../../features/cart';
import {useSelector, useDispatch} from 'react-redux';

export default function VegetablesBulkScreen({route, navigation}) {

    const dispatch = useDispatch();

    const {vegetable, vegetableBulk, loadVegetable, errorVegetable, last, lastBulk} = useSelector(vegetableSelector);

    const {items} = useSelector(cartSelector);

    const [selectedValue, setSelectedValue] = useState();
    const pickerRef = useRef();

    const products = () => {
        if(route.name == 'VegetablesBulk') {
            return vegetableBulk;
        }
        return vegetable;
    }

    useEffect(() => {
        dispatch(fetchRegVeg("bulk"))
    },[dispatch, route.name]);



    console.log("route name and route params >>>",route, route.name)

    const handleBuy = (item) => {
        console.log('item name =>',item.productName);
        dispatch(addToCart(item, selectedValue));
        console.log(items);
    }


    return ( 
        <ScrollView onScroll={e => { 
            const maxOffset = Math.round(e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height);
            const yOffset = Math.round(e.nativeEvent.contentOffset.y)
            if(yOffset >= maxOffset) {
                console.log("scrolled")
                return dispatch(fetchRegVegOnScroll('bulk', lastBulk));
            }
          }}
          scrollEventThrottle={300} 
          style={styles.container}>
            {
                vegetableBulk.map((product, key) => 

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
                                <Text style={ styles.minimumQty }>Minimum Quantity {product.minOrderQty}kgs</Text>
                            </View>
                            <Button 
                            mode="contained" 
                            onPress={() => {handleBuy(product)}}
                            color="#37c7ad"
                            labelStyle={{ color:"#fff" }}
                            >
                                Buy
                            </Button>
                        </View>
                    </View>

                    )
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
