import React, {useState} from 'react'
import { View, StyleSheet, ToastAndroid} from 'react-native'
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import {useDispatch} from 'react-redux'
import {gettingUser} from '../../features/user';
import SecondaryHeader from '../../components/SecondaryHeader'

const showToastWithGravityAndOffset = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

export default function LoginWithPhone({navigation}) {
    const dispatch = useDispatch()

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);

    const sendCodeHandler = async () => {

        const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`)

        setConfirm(confirmation);

        showToastWithGravityAndOffset("verification code sent")
    }

    const loginHandler = async () => {

        if(code === undefined || code === null || code === '') {
            return showToastWithGravityAndOffset('Please verify phone number')
        }

        try {
            await confirm.confirm(code);
            auth().onAuthStateChanged((user) => {
               dispatch(gettingUser(user));
               showToastWithGravityAndOffset("You logged in successfully")
            })
            navigation.navigate('Home');
          } catch (error) {
                if(error.code == 'auth/invalid-phone-number') {
                    showToastWithGravityAndOffset('Invalid phone number')
                } else if (error.code == 'auth/user-not-found') {
                    showToastWithGravityAndOffset('User not found')
                }else if (error.code == 'auth/invalid-password') {
                    showToastWithGravityAndOffset('Invalid password')
                } else {
                    showToastWithGravityAndOffset('Login failed')
                }
          }
     
    }

    return (
        <View style={{ flex:1 }}>
            <SecondaryHeader navigation={navigation} screenName="Phone Login"/>
            <View style={styles.container}>
                <View>
                    <TextInput 
                        label="Mobile Number"
                        onChangeText={text => setPhoneNumber(text)}
                        mode="outlined"
                        keyboardType="numeric"
                    />
                    <Button
                        style={styles.sendCodeBtn}
                        onPress={sendCodeHandler}
                    >
                        Send code
                    </Button>
                </View>
                <TextInput 
                    label="Enter OTP"
                    onChangeText={text => setCode(text)}
                    mode="outlined"
                    keyboardType="numeric"
                />
                <Button 
                    mode="contained"
                    style={{ marginTop:8 }}
                    labelStyle={{ color:'#fff' }}
                    onPress={loginHandler}
                >
                    Login
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:12,
        marginTop:24
    },
    sendCodeBtn:{
        position: 'absolute',
        marginTop: 14,
        right:0,
        zIndex:1,
    }
})

