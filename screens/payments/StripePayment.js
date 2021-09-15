import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useSelector} from 'react-redux'
import {cartDetailsSelector} from '../../features/cartDetails';

export default function StripePayment() {
    const {cartDetails} = useSelector(cartDetailsSelector);

    console.log('Stripe Payment Screen >>>',cartDetails);

    return (
        <View style={styles.container}>

            <Text>Pay for {cartDetails.grandTotal}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
    }
})
