import React,{useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux'
import {gettingUser} from '../../features/user';

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
    const dispatch = useDispatch()
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {

        if(email === '' || password === '') {
            return showToastWithGravityAndOffset('Fields cannot be empty')
        }
    
        auth()
        .signInWithEmailAndPassword(email,password)
        .then((user) => {
            dispatch(gettingUser(user.user))
            showToastWithGravityAndOffset("logined successfully");
        })
        .catch((error) => {
            if(error.code == 'auth/user-not-found') {
                showToastWithGravityAndOffset("User not found");
            } else if (error.code == 'auth/invalid-email') {
                showToastWithGravityAndOffset("Invalid email")
            }else if (error.code == 'auth/invalid-password') {
                showToastWithGravityAndOffset('Invalid password')
            }  else {
                showToastWithGravityAndOffset("Login failed")
            }
        })
         
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <TextInput
                    label="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    style={ styles.textInput}
                />
                <TextInput
                    label="password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    style={ styles.textInput}
                />
                <Button 
                    mode="contained" 
                    onPress={() => onLogin()}
                    style={styles.button}
                    labelStyle={{ color:"#fff" }}
                >
                    Login
                </Button>
                <View style={{ alignItems:'center' }}>
                    <Text style={{ fontSize: 18, marginTop:12}}>Or</Text>
                    <Button onPress={() => navigation.navigate('PhoneLogin')}>Login With Mobile</Button>
                </View>
                <View style={styles.registerContainer}>
                    <Text style={styles.text}>Not registered ?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.textSignUp}>Register Here</Text>
                    </TouchableOpacity>
                </View>
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
