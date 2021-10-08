import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SecondaryHeader from '../components/SecondaryHeader'
import { RadioButton, Button } from 'react-native-paper';

import {cartDetailsSelector} from '../features/cartDetails';
import {useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import firestore from '@react-native-firebase/firestore';

import {API_URL} from '../config'

export default function PaymentOptions({navigation}) {
    const [checked, setChecked] = useState('upi');
    const {cartDetails} = useSelector(cartDetailsSelector);

    const cardHandler = () => {
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


    const [mid, setMid] = useState('AliSub58582630351896');
    const [orderId, setOrderId] = useState();
    const [amount, setAmount] = useState('1');
    const [tranxToken, setTranxToken] = useState('b9097bda72af4db0a9aa2d00e58a7d451594201196818');
    const [showToast, setShowToast] = useState('');
    const [isStaging, setIsStaging] = useState(false);
    const [appInvokeRestricted, setIsAppInvokeRestricted] = useState(false);
    const [result, setResult] = useState('');


    const paytmHandler = () => {
        AllInOneSDKManager.startTransaction(
            orderId,
            mid,
            tranxToken,
            amount,
            '',
            isStaging,
            appInvokeRestricted,
           )
           .then((result) => {
            updateUI(result);
           })
           .catch((err) => {
            handleError(err);
           });
    }

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
            
            console.log(orderId);

        } catch (err) {
            console.error(err);
        }
    }

    const handleContinue = () => {
        console.log("continue")
        switch(checked){
            case 'paytm':
                paytmHandler();
                break;
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
                        value="paytm"
                        status={ checked === 'paytm' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('paytm')}
                    />
                    <Text style={{ fontSize:18 }}>Paytm</Text>
                </View>
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
