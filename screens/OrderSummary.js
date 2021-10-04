import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph} from 'react-native-paper';

import {useSelector} from 'react-redux';

import SecondaryHeader from '../components/SecondaryHeader'
import { userSelector } from '../features/user';
import {cartDetailsSelector} from '../features/cartDetails';
import RazorpayCheckout from 'react-native-razorpay';


export default function CartScreen({route, navigation}) {

    const {user} = useSelector(userSelector);
    const {cartDetails} = useSelector(cartDetailsSelector);

    const handleProceed = () => {
        navigation.navigate('PaymentOptions')
    }

    if(cartDetails === null) {
        return <Text>Loading...</Text>
    }

    console.log(cartDetails)


    const paymentHandler = () => {
        var options = {
            description: 'Credits towards AgroFreshDL',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_UBjdvnwSJMGRzh',
            amount: cartDetails.grandTotal*100,
            name: 'AgroFreshDL',
            prefill: {
            email: cartDetails.email,
            contact: cartDetails.phone,
            name: cartDetails.user
            },
            theme: {color: '#37c4ad'}
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    return (
        <View style={styles.mainContainer}>
            <SecondaryHeader navigation={navigation} screenName="Order Summary" />
            <ScrollView style={styles.container}>
                <Card style={{ width:`${98}%` }}>
                    <Card.Content>
                        <Title>Delivery Address</Title>
                        <Paragraph>{cartDetails.user}</Paragraph>
                        <Paragraph>
                            {cartDetails.deliveryAddress.houseNumber}
                            ,{cartDetails.deliveryAddress.area}
                            ,{cartDetails.deliveryAddress.landmark},
                            ,{cartDetails.deliveryAddress.selectedCity}
                            ,{cartDetails.deliveryAddress.selectedState}
                            ,{cartDetails.deliveryAddress.pincode}
                        </Paragraph>
                        <Paragraph>{cartDetails.phone}</Paragraph>
                    </Card.Content>
                </Card>

                    {
                    cartDetails.items.map((product, key) => 
                        
                        <View style={styles.card} key={key}>
                            <View style={styles.productContainer}>
                                <Image 
                                    source={{ uri:product[0].imageURL }}
                                    style={ styles.thumbnail }
                                />
                                <View style={styles.productDescription}>
                                    <Text style={ styles.prodTitle }>{product[0].productName}</Text>
                                    <View style={ styles.priceContainer }>
                                        <Text style={ styles.rate }>₹ {product[0].sellingPrice}/kg</Text>
                                        <Text style = { styles.discountRate }>₹ {product[0].discountPrice}/kg</Text>
                                    </View>
                                    <View style={ styles.pickerContainer }>
                                        <Text style={{ color:'grey' }}> 
                                        {product[1] === undefined ? 'No Packaging' : `Packaging of ${product[1]}`}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    )
                }

                {
                    cartDetails.subTotalRegular > 0 && 

                    <View style={styles.cartDetails}>
                        <View style={styles.cartDetailsRow}>
                            <View style={{flex:1, alignItems:'flex-start' }}>
                                <Text style={{ fontSize:15 }}>Category</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{ fontSize:15 }}>Regular Order</Text>
                            </View>
                        </View>
                        <View style={styles.cartDetailsRow}>
                            <View style={{flex:1, alignItems:'flex-start' }}>
                                <Text style={{ color:'red',fontSize:15 }}>Discount</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{ color:'red',fontSize:15 }}>₹{cartDetails.totalDiscountRegular.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={styles.cartDetailsRow}>
                            <View style={{flex:1, alignItems:'flex-start' }}>
                                <Text style={{ fontSize:15 }}>Subtotal</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{ fontSize:15 }}>₹{cartDetails.subTotalRegular.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={styles.cartDetailsRow}>
                            <View style={{flex:1, alignItems:'flex-start' }}>
                                <Text style={{ fontSize:18 }}>Total</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{ fontSize:18 }}>₹{cartDetails.totalRegular.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                
                }

        
                {
                    cartDetails.subTotalBulk > 0 &&

                    <View style={styles.cartDetails}>
                        <View style={styles.cartDetailsRow}>
                            <View style={{flex:1, alignItems:'flex-start' }}>
                                <Text style={{ fontSize:15 }}>Category</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{ fontSize:15 }}>Bulk Order</Text>
                            </View>
                        </View>
                        <View style={styles.cartDetailsRow}>
                            <View style={{flex:1, alignItems:'flex-start' }}>
                                <Text style={{ color:'red',fontSize:15 }}>Discount</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{ color:'red',fontSize:15 }}>₹{cartDetails.totalDiscountBulk.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={styles.cartDetailsRow}>
                            <View style={{flex:1, alignItems:'flex-start' }}>
                                <Text style={{ fontSize:15 }}>Subtotal</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{ fontSize:15 }}>₹{cartDetails.subTotalBulk.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={styles.cartDetailsRow}>
                            <View style={{flex:1, alignItems:'flex-start' }}>
                                <Text style={{ fontSize:18 }}>Total</Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={{ fontSize:18 }}>₹{cartDetails.totalBulk.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View> 
                    
                }

                {
                    cartDetails.grandTotal > 0 && 
                    <View style={styles.grandTotal}>
                        <View style={{ flex:1,alignItems:'flex-start' }}>
                            <Text style={{ fontWeight: 'bold', fontSize:16, color:'#37c7ad' }}>You Saved</Text>
                        </View>
                        <View style={{ flex:1,alignItems:'flex-end' }}>
                            <Text style={{ fontWeight: 'bold', fontSize:16, color:'#37c7ad' }}>
                                ₹{cartDetails.allSaving.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                }
                {
                    cartDetails.grandTotal > 0 && 
                    <View style={styles.grandTotal}>
                        <View style={{ flex:1,alignItems:'flex-start' }}>
                            <Text style={{ fontSize:16 }}>Delivery Charge</Text>
                        </View>
                        <View style={{ flex:1,alignItems:'flex-end' }}>
                            <Text style={{ fontSize:16, color:'black' }}>
                                {typeof cartDetails.deliveryCharge === 'string' && cartDetails.deliveryCharge}
                                {typeof cartDetails.deliveryCharge === 'number' && `₹${cartDetails.deliveryCharge}`}
                            </Text>
                        </View>
                    </View>
                }
                {
                    cartDetails.grandTotal > 0 && 
                    <View style={styles.grandTotal}>
                        <View style={{ flex:1,alignItems:'flex-start' }}>
                            <Text style={{ fontWeight: 'bold', fontSize:16 }}>Grand Total</Text>
                        </View>
                        <View style={{ flex:1,alignItems:'flex-end' }}>
                            <Text style={{ fontWeight: 'bold', fontSize:16 }}>
                                ₹{cartDetails.grandTotal}
                            </Text>
                        </View>
                    </View>
                }
        
            </ScrollView>
            <View>
                <Button mode="contained" onPress={paymentHandler} labelStyle={{ color:"white" }}>Proceed for ₹{cartDetails.grandTotal}</Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1
    },
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
        padding:6,
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
    },
    offerContainer:{
        marginTop:12,
        width: `${98}%` 
    },
    cartDetails:{
        width: `${98}%`,
        marginTop:12,
        marginBottom:12,
        borderWidth:1,
        borderColor:"#37c7ad",
        padding:8 
    },
    cartDetailsRow:{
        flex:1,
        flexDirection: 'row',
    },
    grandTotal:{
        width: `${98}%`,
        flex:1,
        flexDirection:'row',
        padding:8
    }
})


