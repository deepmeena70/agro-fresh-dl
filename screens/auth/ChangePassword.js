import React,{useState} from 'react'
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import SecondaryHeader from '../../components/SecondaryHeader'
import auth from '@react-native-firebase/auth';

const showToastWithGravityAndOffset = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

export default function ChangePassword({navigation}) {

    const [email, setEmail] = useState('');

    const forgetPasswordHandler = () => {
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                showToastWithGravityAndOffset("Password reset link sent to email")
            }).catch((err) => {
                console.error(err.message);
                showToastWithGravityAndOffset("Error");
            })
    }

    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="Forget Password"/>

            <View style={{ marginTop:6, padding:8 }}>
                <TextInput 
                    title="Email"
                    placeholder="Enter your email address"
                    mode="outlined"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Button
                    mode="contained"
                    labelStyle={{ color:"#fff" }}
                    onPress={forgetPasswordHandler}
                    style={{ marginTop:12 }}
                >
                    Send Link
                </Button>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})
