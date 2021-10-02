import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import SecondaryHeader from '../../components/SecondaryHeader'
import auth from '@react-native-firebase/auth';

const Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
    return null;
  };

export default function ChangePassword({navigation}) {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPasswrord] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [visibleToast, setvisibleToast] = useState(false);

    useEffect(() => setvisibleToast(false), [visibleToast]);

    const changePassword = () => {

        if(newPassword !== confirmPassword) {
            return;
        }

        const credential = auth.EmailAuthProvider.credential(
            auth().currentUser.email,
            newPassword
        );

            auth()
            .currentUser
            .reauthenticateWithCredential(credential)
            .then(() => {
                auth()
                .currentUser
                .updatePassword(newPassword)
                .then(() => {navigation.navigate('Account')})
                .catch(err=> {
                    console.error(err);
                    setMessage(String(err));
                    setvisibleToast(true)
                })
            })
            .catch(err=> {
                console.error(err);
                setMessage(String(err));
                setvisibleToast(true)
                
            })


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

            <Toast visible={visibleToast} message={message} />
        </View>
    )
}

const styles = StyleSheet.create({})
