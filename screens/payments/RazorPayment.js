import React from 'react'
import { View, Text, Button } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import RazorpayCheckout from 'react-native-razorpay';

export default function RazorPayment() {

    const paymentHandler = () => {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_UBjdvnwSJMGRzh',
            amount: '5000',
            name: 'Acme Corp',
            prefill: {
            email: 'gaurav.kumar@example.com',
            contact: '9191919191',
            name: 'Gaurav Kumar'
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

        <View style={{ flex:1, alignItems: 'center'}}>
            <Button onPress={paymentHandler} title="Pay Now"/>
        </View>
        
        
        
    )
}
