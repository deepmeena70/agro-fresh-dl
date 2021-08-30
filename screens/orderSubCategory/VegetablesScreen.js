import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

import {fetchRegVeg, vegetableClear, vegetableSelector} from '../../features/vegetable';
import {addToCart, cartSelector} from '../../features/cart';
import {useSelector, useDispatch} from 'react-redux';

export default function VegetablesScreen({route, navigation}) {

    const dispatch = useDispatch();

    console.log('route from vegetable =>' , route.name);

    const {vegetable, vegetableBulk, loadVegetable, errorVegetable} = useSelector(vegetableSelector);

    const {items} = useSelector(cartSelector);


    useEffect(() => {
        dispatch(vegetableClear())
       if(route.name === 'Vegetables') 
            dispatch(fetchRegVeg())
        else 
            dispatch(fetchRegVeg('bulk'))
    },[dispatch]);

    const [selectedValue, setSelectedValue] = useState()
    const pickerRef = useRef();

    function open() {
    pickerRef.current.focus();
    }

    function close() {
    pickerRef.current.blur();
    }

    const products = () => {
        if(route.name == 'VegetablesBulk') {
            return vegetableBulk;
        }
        return vegetable;
    }

    const handleBuy = (item) => {
        console.log('item name =>',item.productName);
        dispatch(addToCart(item, selectedValue));
        console.log(items);
    }

    return ( 
        <ScrollView style={styles.container}>
            {
                products().map((product, key) => 

                    <View style={styles.card} key={key}>
                        <View style={styles.productContainer}>
                            <Image 
                                source={{ uri:product.imageURL }}
                                style={ styles.thumbnail }
                            />
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
        flex:1, borderWidth:1, 
        borderColor:"lightgrey", 
        width:100, 
        marginTop: 6
    },
    picker:{
        height:20, 
        width:100
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
