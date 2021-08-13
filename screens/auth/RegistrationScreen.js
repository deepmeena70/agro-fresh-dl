import React,{useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import firebase from '../../firebase'

import {useDispatch, useSelector} from 'react-redux'
import {signingIn, fetchUser, userSelector} from '../../features/user'

export default function LoginScreen({navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const {user,loading, hasErrors, signIn} = useSelector(userSelector)

  const onSignUp = async () => {
    if(signIn) {
        console.log('You already signIn')
    } else {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase
                .firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({name,email,phone})
                .then(() => {
                    dispatch(signingIn())
                    navigation.navigate('Home')
                })
        })
        .catch((error)=> console.log(error))
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
            />
            <TextInput
                label="Phone"
                onChangeText={text => setPhone(text)}
                value={phone}
                style={ styles.textInput}
            />
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
                onPress={() => onSignUp()}
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
