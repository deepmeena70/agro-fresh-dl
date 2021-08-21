import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {fruitSelector, fruitClear, fetchRegFruit} from '../../features/fruit';

export default function FruitsScreen({route, navigation}) {
    const [selectedValue, setSelectedValue] = useState("1")
    const pickerRef = useRef();

    const dispatch = useDispatch();
    const {fruit, fruitBulk, loadFruit, errorFruit} = useSelector(fruitSelector);

    useEffect(() => {
        dispatch(fruitClear())
       if(route.name === 'Fruits') 
            dispatch(fetchRegFruit())
        else 
            dispatch(fetchRegFruit('bulk'))
    },[dispatch]);


    function open() {
    pickerRef.current.focus();
    }

    function close() {
    pickerRef.current.blur();
    }

    const products = () => {
        if(route.name == 'FruitsBulk') {
            return fruitBulk;
        }
        return fruit;
    }
    
    return (
        <ScrollView style={styles.container}>
             {products().map(product => 

                <View style={styles.card}>
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
                                    <Picker.Item  style={ styles.pickerItem } label="1 kg" value="1" />
                                    <Picker.Item  style={ styles.pickerItem } label="2 kg" value="2" />
                                </Picker>
                            </View>
                            <Text style={ styles.minimumQty }>Minimum Quantity .5kgs</Text>
                        </View>
                        <Button 
                        mode="contained" 
                        onPress={() => console.log('Pressed')}
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
