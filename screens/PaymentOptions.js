import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SecondaryHeader from '../components/SecondaryHeader'
import { RadioButton, Button } from 'react-native-paper';

import {cartDetailsSelector} from '../features/cartDetails';
import {useSelector} from 'react-redux';

export default function PaymentOptions({navigation}) {
    const [checked, setChecked] = useState('upi');
    const {cartDetails} = useSelector(cartDetailsSelector);

    const handleContinue = () => {
        console.log("continue")
        switch(checked){
            case 'upi':
                navigation.navigate('UpiOptions');
                break;
            case 'card':
                navigation.navigate('CardOptions'); 
        }
    }

    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="Payment Options"/>
            <View style={{ flex:1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                        value="upi"
                        status={ checked === 'upi' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('upi')}
                    />
                    <Text style={{ fontSize:18 }}>UPI</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                        value="wallet"
                        status={ checked === 'wallet' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('wallet')}
                    />
                    <Text style={{ fontSize:18 }}>Wallet</Text>
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
                        value="banking"
                        status={ checked === 'banking' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('banking')}
                    />
                    <Text style={{ fontSize:18 }}>Net Banking</Text>
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
