import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SecondaryHeader from '../components/SecondaryHeader'
import { RadioButton, Button } from 'react-native-paper';

import {clearCart} from '../features/cart'
import {cartDetailsSelector, clearCartDetails} from '../features/cartDetails';
import {userSelector} from '../features/user';
import {useSelector, useDispatch} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import firestore from '@react-native-firebase/firestore';

import {API_URL} from '../config';

export default function PaymentOptions({navigation}) {
    const [checked, setChecked] = useState('upi');
    const {cartDetails} = useSelector(cartDetailsSelector);
    const {user} = useSelector(userSelector);
    const dispatch = useDispatch();

    console.log('user uid >>>',user.uid);

    const cardHandler = async () => {
        
        try{
            const response = await fetch(`${API_URL}/razorpay/create?total=${cartDetails.grandTotal}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
              }
            );

            const {orderId, order} = await response.json();

            console.log('razorpay >>>', orderId);
            console.log('razorpay >>>', order);

            var options = {
                description: 'Credits towards AgroFreshDL',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_H6pCRj9KnCtALd',
                amount: order.amount,
                name: 'AgroFreshDL',
                order_id: order.id,
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
                const setData = {
                    orderDetails: JSON.stringify(cartDetails),
                    orderCreatedAt: firestore.Timestamp.now(),
                    orderId:orderId,
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: data.razorpay_order_id,
                    razorpay_signature: data.razorpay_signature,
                    orderApproved: false,
                    orderProcessed: false,
                    orderShipping: false,
                    orderDelivered: false,
                    paymentMode: 'razorpay',
                    uid: user.uid
                }
                firestore()
                    .collection('orders')
                    .add(setData)
                    .then(() => {
                        dispatch(clearCart());
                        navigation.navigate('OrderDetails', {
                            orderId: orderId
                        });
                    })
                    .catch (err => console.log(err));
            }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });

        } catch(err){
            console.log(err);
        }
  
    }

    console.log(cartDetails);


    const codHandler = async () => {
        console.log(API_URL);
        try{
            const response = await fetch(`${API_URL}/cod`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    
                  }
            );
            const {orderId} = await response.json();
            const items = {
                orderId:orderId,
                orderDetails: JSON.stringify(cartDetails),
                orderCreatedAt: firestore.Timestamp.now(),
                orderApproved: false,
                orderProcessed: false,
                orderShipping: false,
                orderDelivered: false,
                paymentMode: 'cod',
                uid: user.uid
            }
            firestore()
                .collection('orders')
                .add(items)
                .then(() => {
                    dispatch(clearCart());
                    navigation.navigate('OrderDetails', {
                        orderId: orderId
                    });
                })
                .catch(err => console.log(err))
            

        } catch (err) {
            console.error(err);
        }
    }

    const handleContinue = () => {
        console.log("continue")
        switch(checked){
            case 'card':
                cardHandler();
                break;
            case 'cod':
                codHandler();
                break;
        }
    }

    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="Payment Options"/>
            <View style={{ flex:1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                        value="card"
                        status={ checked === 'card' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('card')}
                    />
                    <Text style={{ fontSize:18 }}>Credit/Debit/ATM Card</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                        value="cod"
                        status={ checked === 'cod' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('cod')}
                    />
                    <Text style={{ fontSize:18 }}>Cash on delivery</Text>
                </View>
            </View>
            <View style={styles.continue}>
                <View style={{ flex:1,justifyContent:'flex-start' }}>
                    <Text style={{ fontSize:14, color:'#37c7ad' }}>Grand Total</Text>
                    <Text style={{ fontSize:22 }}>₹{cartDetails.grandTotal}</Text>
                </View>
                <View style={{ flex:1,justifyContent:'flex-end'  }}>
                    <Button
                        mode="contained"
                        onPress={() => handleContinue()}
                        labelStyle={{ color:"#fff" }}
                    >
                        Continue
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    continue:{
        flexDirection: 'row',
        padding:12,
        borderWidth:1,
        borderColor: 'transparent',
        borderTopColor: 'lightgrey'
    }
})
