import React, {useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import SecondaryHeader from '../components/SecondaryHeader'
import { RadioButton, Button } from 'react-native-paper';
import {cartDetailsSelector} from '../features/cartDetails';
import {useSelector} from 'react-redux';

export default function UpiOptions({navigation}) {
    const [checked, setChecked] = useState('gPay');
    const {cartDetails} = useSelector(cartDetailsSelector);
    return (
        <View style={{ flex:1 }}>
            <SecondaryHeader navigation={navigation} screenName="Select UPI App" />
            <View style={{flex:1, padding:12 }}>
                <View style={{ flexDirection:'row', alignItems: 'center' }}>
                    <View>
                        <RadioButton
                            value="gPay"
                            status={ checked === 'gPay' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('gPay')}
                        />
                    </View>
                    <View
                        style={{ flex:1, alignItems: 'flex-end'}}
                    >
                        <Image
                            style={{ width: 80, height:30 }} 
                            source={{ uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Google_Pay_%28GPay%29_Logo_%282018-2020%29.svg/1280px-Google_Pay_%28GPay%29_Logo_%282018-2020%29.svg.png" }}

                        />
                    </View>
                </View>
                <View style={{ flexDirection:'row', alignItems: 'center' }}>
                    <View>
                        <RadioButton
                            value="phonePe"
                            status={ checked === 'phonePe' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('phonePe')}
                        />
                    </View>
                    <View
                        style={{ flex:1, alignItems: 'flex-end'}}
                    >
                        <Image
                            style={{ width: 80, height:21 }} 
                            source={{ uri:"https://upload.wikimedia.org/wikipedia/en/thumb/7/71/PhonePe_Logo.svg/440px-PhonePe_Logo.svg.png" }}

                        />
                    </View>
                </View>
                <View style={{ flexDirection:'row', alignItems: 'center' }}>
                    <View>
                        <RadioButton
                            value="paytm"
                            status={ checked === 'paytm' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('paytm')}
                        />
                    </View>
                    <View
                        style={{ flex:1, alignItems: 'flex-end'}}
                    >
                        <Image
                            style={{ width: 80, height:28 }} 
                            source={{ uri:"https://images.financialexpress.com/2017/05/paytm.jpg" }}

                        />
                    </View>
                </View>
                <View style={{ flexDirection:'row', alignItems: 'center' }}>
                    <View>
                        <RadioButton
                            value="yourUPI"
                            status={ checked === 'yourUPI' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('yourUPI')}
                        />
                    </View>
                    <View
                        style={{ flex:1, alignItems: 'flex-end'}}
                    >
                        <Text>YOUR UPI</Text>
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
