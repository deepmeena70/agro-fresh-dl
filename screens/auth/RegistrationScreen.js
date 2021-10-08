import React,{useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth'

import {useDispatch} from 'react-redux'
import {gettingUser} from '../../features/user'

export default function LoginScreen({navigation}) {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');


    // Handle create account button press
    async function registerHandler() {

        try {
          await auth().createUserWithEmailAndPassword(email, password)
          confirmCode();
          const update = {
            displayName: name,
          };
          await auth().currentUser.updateProfile(update);

          console.log('User account created & signed in!');
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
    
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        }

        auth().onAuthStateChanged(user => {
            dispatch(gettingUser(user));
        })

      }
    
      // Handle the verify phone button press
      async function sendCodeHandler() {
        const confirmation = await auth().verifyPhoneNumber(`+91${phoneNumber}`);
        setConfirm(confirmation);
      }
    
      // Handle confirm code button press
      async function confirmCode() {
        try {
          const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
          await auth().currentUser
            .linkWithCredential(credential);
        } catch (error) {
          if (error.code == 'auth/invalid-verification-code') {
            console.log('Invalid code.');
          } else {
            console.log('Account linking error');
          }
        }
      }
    
  return (
    <View style={styles.container}>
     
        <View style={styles.loginContainer}>
            <TextInput
                label="Full Name"
                onChangeText={text => setName(text)}
                value={name}
                style={ styles.textInput}
                mode="outlined"
            />
            <TextInput
                label="Phone"
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
                style={ styles.textInput}
                placeholder="999 999 9999"
                mode="outlined"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 0.6, paddingRight:12 }}>
                    <TextInput
                        label="Enter OTP"
                        onChangeText={text=> setCode(text)}
                        style={ styles.textInput}
                        mode="outlined"
                    />
                    {message ? 
                        <Text
                            style={{
                            color: message.color || '#37c4ad',
                            fontSize: 14,
                            textAlign: 'center',
                            marginTop: 6,
                            }}>
                            {message.text}
                        </Text>
                        : undefined
                    }
                </View>
                <View style={{ flex:0.4 }}>
                    <Button
                        mode="text"
                        onPress={sendCodeHandler}
                    >
                        {!error ? 'Send Code' : 'Resend Code'}
                    </Button>
                </View>
            </View>
            <TextInput
                label="Email"
                onChangeText={text => setEmail(text)}
                value={email}
                style={ styles.textInput}
                mode="outlined"
            />
            <TextInput
                label="password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
                style={ styles.textInput}
                mode="outlined"
            />
            <Button 
                mode="contained" 
                onPress={registerHandler}
                style={styles.button}
                labelStyle={{ color:"#fff" }}
            >
                Register
            </Button>
     
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        
    },
    loginContainer:{
        flex:1,
        justifyContent: 'center',
        padding:12
    },
    textInput:{
        marginTop:12
    },
    text:{
        fontSize:16 
    },
    textSignUp:{
        paddingLeft:5, 
        fontSize:16,
        color:'#37C7AD' 
    },
    button:{
        marginTop:12,
    },
    registerContainer:{
        marginTop:12,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
