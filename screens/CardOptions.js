import React, {useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import SecondaryHeader from '../components/SecondaryHeader'
import { RadioButton, Button } from 'react-native-paper';
import {cartDetailsSelector} from '../features/cartDetails';
import {useSelector} from 'react-redux';

export default function CardOptions({navigation}) {
    const [checked, setChecked] = useState('payu');
    const {cartDetails} = useSelector(cartDetailsSelector);
    return (
        <View style={{ flex:1 }}>
            <SecondaryHeader navigation={navigation} screenName="Select" />
            <View style={{flex:1, padding:12 }}>
                <View style={{ flexDirection:'row', alignItems: 'center' }}>
                    <View>
                        <RadioButton
                            value="payu"
                            status={ checked === 'payu' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('gPay')}
                        />
                    </View>
                    <View
                        style={{ flex:1, alignItems: 'flex-end'}}
                    >
                        <Image
                            style={{ width: 80, height:30 }} 
                            source={{ uri:"https://lh3.googleusercontent.com/proxy/CM4H9fYHNOWGcObO6fSeLSs5kkjoKX8f8-Gu4ph9frc5w7VVZupjVDgqjTxgiKNlq21590IXZ5q4ADcZMvglYipoSR2hL6M1glOzph-QY7bfGUOEckCDqP8" }}

                        />
                    </View>
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
                        Pay Now
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    continue:{
        flexDirection: 'row',
        padding:12,
        borderWidth:1,
        borderColor: 'transparent',
        borderTopColor: 'lightgrey'
    }
})
