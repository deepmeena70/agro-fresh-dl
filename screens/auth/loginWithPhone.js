import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import {useDispatch} from 'react-redux'
import {gettingUser} from '../../features/user';

export default function LoginWithPhone({navigation}) {
    const dispatch = useDispatch()

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);

    const sendCodeHandler = async () => {
        console.log('send code handler');
        const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
        setConfirm(confirmation);
    }

    const loginHandler = async () => {
        try {
            await confirm.confirm(code);
            auth().onAuthStateChanged((user) => {
               dispatch(gettingUser(user));
            })
            navigation.navigate('Home');
          } catch (error) {
            console.log(`${error.message}`);
          }
    }

    return (
        <View style={styles.container}>
            <View>
                <TextInput 
                    label="Mobile Number"
                    onChangeText={text => setPhoneNumber(text)}
                    mode="outlined"
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding:12
    },
    sendCodeBtn:{
        position: 'absolute',
        marginTop: 14,
        right:0,
        zIndex:1,
    }
})

