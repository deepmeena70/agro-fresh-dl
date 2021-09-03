import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import SecondaryHeader from '../../components/SecondaryHeader'
import {Button} from 'react-native-paper'
import firebase from '../../firebase'

export default function ChangePassword({navigation}) {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPasswrord] = React.useState('');

    const changePassword = () => {

        if(newPassword !== confirmPassword) {
            return;
        }

        const credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            newPassword
        );

        firebase
            .auth()
            .currentUser
            .reauthenticateWithCredential(credential)
            .then(() => {
                firebase
                .auth()
                .currentUser
                .updatePassword(newPassword)
                .then(() => {navigation.navigate('Account')})
                .catch(err=> console.error(err))
            })
            .catch(err=> console.error(err))


    }

    return (
        <View>
            <SecondaryHeader navigation={navigation} screenName="Change Password"/>
            <TextInput
                label="Current Password"
                value={currentPassword}
                onChangeText={text => setCurrentPassword(text)}
            />
            <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
            />
            <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={text => setConfirmPasswrord(text)}
            />
            <Button
                mode="contained"
                labelStyle={{ color:"#fff" }}
                onPress={() => changePassword()}
            >
                Change Password
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({})
