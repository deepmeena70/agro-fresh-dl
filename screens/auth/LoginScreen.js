import React,{useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import firebase from '../../firebase'
import {useDispatch, useSelector} from 'react-redux'
import {signingIn, fetchUser, userSelector} from '../../features/user'


export default function LoginScreen({navigation}) {
    const dispatch = useDispatch()
    const {user,loading, hasErrors, signIn} = useSelector(userSelector)
   

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        if(signIn){
            console.log('you already logged in')
        } else {
            firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => {
                dispatch(signingIn())
                navigation.navigate('Home')
            })
            .catch((error) => {
                console.log(error)
            })
        } 
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
                <View style={styles.registerContainer}>
                    <Text style={styles.text}>Not a member ?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.textSignUp}>Register</Text>
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
