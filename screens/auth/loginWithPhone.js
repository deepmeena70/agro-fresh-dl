import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

import firebase from '../../firebase'

import {useDispatch} from 'react-redux';
import {gettingUser} from '../../features/user';

export default function LoginWithPhone() {
    const recaptchaVerifier = React.useRef(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, showMessage] = React.useState(
      !firebaseConfig || Platform.OS === 'web'
        ? {
            text:
              'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
          }
        : undefined
    );

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
    
      const onPressVerifyPhoneNumber = async () => {
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

        const user = firebase
                        .auth()
                        .currentUser;

        if(user !== null) {
            dispatch(gettingUser(user));
        }
      }
    
      const attemptInvisibleVerification = true;

    return (
     <View style={{ flex:1 }}>
            <View style={{ flex:1, justifyContent: 'center', padding:12 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={attemptInvisibleVerification}
            />
            <TextInput
                label="Enter Mobile Number"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
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
            <Button
                mode="contained"
                labelStyle={{ color:"#fff" }}
                onPress={() => onPressVerifyPhoneNumber()}
                style={{ marginTop:12 }}
            >
                Login
            </Button>
        </View>
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
     </View>
    )
}

const styles = StyleSheet.create({})
