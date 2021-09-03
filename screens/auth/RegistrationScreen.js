import React,{useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firebase from '../../firebase'
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';


import {useDispatch} from 'react-redux'
import {gettingUser} from '../../features/user'

export default function LoginScreen({navigation}) {

  const recaptchaVerifier = React.useRef(null);  

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === 'web'
      ? {
          text:
            'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
        }
      : undefined
  );

  const dispatch = useDispatch();

  const onPressSendCode = async () => {
    
    // The FirebaseRecaptchaVerifierModal ref implements the
    // FirebaseAuthApplicationVerifier interface and can be
    // passed directly to `verifyPhoneNumber`.
    try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91${phoneNumber}`,
        recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        showMessage({
        text: 'Verification code has been sent to your phone.',
        });
    } catch (err) {
        showMessage({ text: `Error: ${err.message}`, color: 'red' });
    }
      
  }

  const attemptInvisibleVerification = true;


  const onSignUp = async () => {
    if(name.length === 0){
        console.log('Enter Name')
    }
    if(phoneNumber.length === 0){
        console.log('Enter valid Mobile Number')
    }
    if(email.length === 0){
        console.log('Enter Email')
    }
    if(password.length === 0){
        console.log('Enter Password')
    }

    if(name.length === 0 || phoneNumber.length === 0 || email.length === 0 || password.length === 0) {
        return;
    }

    console.log(firebase.auth().currentUser)

    try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
        await firebase.auth().signInWithCredential(credential);
        showMessage({ text: 'Verified successfully' });
      } catch (err) {
        setError(err);  
        showMessage({ text: `Error: Invalid code`, color: 'red' });
      }

    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    firebase
        .auth()
        .currentUser
        .linkWithCredential(credential)
        .then(() => {
            console.log(firebase.auth().currentUser);
            const user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: name
            }).then(() => {
                dispatch(gettingUser(user));
            })

        }).catch(err => {console.log(err)});
  }

  return (
    <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={attemptInvisibleVerification}
        />
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
                        onChangeText={setVerificationCode}
                        style={ styles.textInput}
                        mode="outlined"
                        editable={!!verificationId}
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
                        onPress={() => onPressSendCode()}
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
                onPress={() => onSignUp()}
                style={styles.button}
                labelStyle={{ color:"#fff" }}
            >
                Register
            </Button>
     
        </View>
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
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
