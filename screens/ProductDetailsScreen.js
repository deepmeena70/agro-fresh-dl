import React,{useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import SecondaryHeaderCart from '../components/SecondaryHeaderCart'
import { Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import {addToCart, cartSelector} from '../features/cart';
import {useSelector, useDispatch} from 'react-redux';


export default function ProductDetailsScreen({route, navigation}) {
    const pickerRef = useRef();
    const [selectedValue, setSelectedValue] = useState();

    const dispatch = useDispatch();

    const {items} = useSelector(cartSelector);

    const handleBuy = (item) => {
        console.log('item name =>',item.productName);
        dispatch(addToCart(item, selectedValue));
        console.log(items);
    }

    console.log(route);
    return (
        <View style={styles.container}>
            <SecondaryHeaderCart navigation={navigation} screenName={route.params.item.productName}/>
            <View style={styles.card}>
                <Image 
                    source={{ uri:`${route.params.item.imageURL}` }}
                    style={{ width: 352, height:200 }}
                />
                <Text style={styles.title}>
                    {route.params.item.productName}
                </Text>
                <View style={{ flexDirection:'row' }}>
                    <View style={{ flex:1 }}>
                        <Text style={{ fontSize:22, color:"#37c4ad", marginTop:4 }}>
                            {(!route.params.item.discountPrice)?`₹${route.params.item.sellingPrice}`:`@ ₹${route.params.item.discountPrice}`}
                        </Text>
                    </View>
                    <View style={{flex:1, justifyContent:"flex-end", marginLeft:190 }}>
                        <Button mode="contained"
                            style={{ width:80 }}
                            labelStyle={{ color:"#fff" }}
                            onPress={() => {handleBuy(route.params.item)}}
                        >
                            Buy
                        </Button>
                    </View>
                </View>
                <Text>Select Package</Text>
                <View style={{ borderWidth:1, borderColor:'lightgrey', margin:2, marginTop:12 }}>
                    <Picker
                        ref={pickerRef}
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedValue(itemValue)
                        }
                        >
                        { route.params.item.packageOf.map((item, index)=>{
                            return (
                                <Picker.Item key={index}  label={`${item} kg`} value={item} />
                            )
                        })}
                    </Picker>
                </View>
                <View
                    style={{ padding:8, paddingTop:12 }}
                >   
                    <Text style={{ color:'grey', fontSize:20, paddingBottom:12 }}>Description</Text>
                    <Text>
                        {route.params.item.description}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    card:{
        flex:1,
        backgroundColor:"white",
        padding:10,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        margin:10 
      },
    title:{
        fontSize: 28
    }
})
