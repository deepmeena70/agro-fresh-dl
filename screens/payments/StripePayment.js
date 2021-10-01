import React,{ useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import {useSelector} from 'react-redux'
import {cartDetailsSelector} from '../../features/cartDetails';
import { StripeProvider, useStripe, clientSecret } from '@stripe/stripe-react-native';
import {API_URL} from "../../config";


function PaymentScreen () {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const {cartDetails} = useSelector(cartDetailsSelector);

    console.log(cartDetails.grandTotal);

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${API_URL}/payment-sheet?total=${cartDetails.grandTotal}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
        paymentIntent,
        ephemeralKey,
        customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
        paymentIntent,
        ephemeralKey,
        customer,
        } = await fetchPaymentSheetParams();

        const { error, paymentOption } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            googlePay: true,
            merchantCountryCode: 'US',
            testEnv: true,
        });
        if (!error) {
        setLoading(true);
        }
    };

    const openPaymentSheet = async () => {

        const { error } = await presentPaymentSheet({ clientSecret });

        if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
        Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <Button
            variant="primary"
            disabled={!loading}
            title="Checkout"
            onPress={openPaymentSheet}
        />
    )


}

export default function StripePayment() {
    const {cartDetails} = useSelector(cartDetailsSelector);

    console.log('Stripe Payment Screen >>>',cartDetails);

    return (
        <View style={styles.container}>
            <Text>Pay for {cartDetails.grandTotal}</Text>
            <StripeProvider
                publishableKey="pk_test_51IG1hcHEkju5OzqanAHWmpiZjpBXDkUz8eZK1tONEUIi7euisrNWNsPAdwaLXiIZOixtK4MTaK7LvITI3jeipV1700k8EIVuKJ"
            >
                <PaymentScreen />
            </StripeProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
    }
})
