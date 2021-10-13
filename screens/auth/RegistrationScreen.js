import React,{useState} from 'react';
import {View, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth'

import {useDispatch} from 'react-redux'
import {gettingUser} from '../../features/user'

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

export default function LoginScreen({navigation}) {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');


    // Handle create account button press
    async function registerHandler() {

        if(name === '' || email === '' || password === '' || confirmPassword === '' || phoneNumber === '') {
          return showToastWithGravityAndOffset('Fields cannot be empty')
        }

        if(password !== confirmPassword) {
          return showToastWithGravityAndOffset("Password does not match")
        }

        if(code === '' || code === null || code === undefined) {
          return showToastWithGravityAndOffset("Please verify phone number")
        }

        try {

          auth().createUserWithEmailAndPassword(email, password)
            .then( async () => {
              try {
                const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
                await auth().currentUser.linkWithCredential(credential);
                showToastWithGravityAndOffset("Phone verification successfull")
              } catch (error) {
                if (error.code == 'auth/invalid-verification-code') {
                  showToastWithGravityAndOffset("OTP invalid")
                } else if (error.code == 'auth/invalid-phone-number'){
                  showToastWithGravityAndOffset("Invalid phone number")
                } else if (error.code == 'auth/phone-number-already-exists') {
                  showToastWithGravityAndOffset("Phone number already exists")
                } else {
                  showToastWithGravityAndOffset("Phone verification failed")
                }
              }
                auth().currentUser.updateProfile({displayName:capitalizeName(name)}).then(() => {
                  auth().onAuthStateChanged(user => {
                    dispatch(gettingUser(user));
                  })
                });

            }).catch((err) => {
              if(err.code == "auth/email-already-exists") {
                return showToastWithGravityAndOffset("Email already exists")
              }
              showToastWithGravityAndOffset("something wrong");
            })
            showWithGravityAndOffset('Successfully Registered')

        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            showToastWithGravityAndOffset("Email already exists")
          }
    
          if (error.code === 'auth/invalid-email') {
            showWithGravityAndOffset("Email is invalid");
          }
        }

      }
    
      // Handle the verify phone button press
      async function sendCodeHandler() {
        showToastWithGravityAndOffset("OTP sent")
        const confirmation = await auth().verifyPhoneNumber(`+91${phoneNumber}`);
        setConfirm(confirmation);

      }

      const capitalizeName = (text) => {
        const str = text;
        const strCapitalizedArr = [];
        const strArr = str.split(" ");
        strArr.forEach(item => {
          strCapitalizedArr.push(item.charAt(0).toUpperCase() + item.toLowerCase().slice(1));
        })
         return strCapitalizedArr.join(' ');
      }

    
  return (
    <View style={{ flex:1 }}>
      <SecondaryHeader navigation={navigation} screenName="Register" />
      <ScrollView>
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                  <TextInput
                      label="Full Name"
                      onChangeText={text => setName(text)}
                      value={capitalizeName(name)}
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
                      keyboardType="numeric"
                  />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ flex: 0.6, paddingRight:12 }}>
                          <TextInput
                              label="Enter OTP"
                              onChangeText={text=> setCode(text)}
                              style={ styles.textInput}
                              mode="outlined"
                              keyboardType="numeric"
                          />
                      </View>
                      <View style={{ flex:0.4 }}>
                          <Button
                              mode="text"
                              onPress={sendCodeHandler}
                          >
                              Send code
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
                  <TextInput
                      label="confirm password"
                      secureTextEntry={true}
                      onChangeText={text => setConfirmPassword(text)}
                      value={confirmPassword}
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
      </ScrollView>
    </View>
 
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:50
        
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
