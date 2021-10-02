import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {userSelector} from '../features/user';
import {userDataSelector} from '../features/userData';
import {useSelector} from 'react-redux';

import SecondaryHeader from '../components/SecondaryHeader'

import firestore from '@react-native-firebase/firestore';

export default function AddDeliveryAddress({navigation}) {
    const [houseNumber, setHouseNumber] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [selectedState, setSelectedState] = useState('Rajasthan');
    const [selectedCity, setSelectedCity] = useState('Kota');
    const [pincode, setPincode] = useState('');

    const {user} = useSelector(userSelector);
    const {userData} = useSelector(userDataSelector);

    console.log(userData)
    console.log(user);

    const handleSave = () => {
        const data = {
            houseNumber,
            area,
            landmark,
            selectedState,
            selectedCity,
            pincode
        }

           firestore()
            .collection('deliveryAddress')
            .doc(user.uid)
            .set(data)
            .then(() => {
                console.log('address added successfully');
                navigation.navigate('OrderSummary');
            })
    }

    return (
        <View>
            <SecondaryHeader navigation={navigation} screenName="Add Delivery Address"/>
            <TextInput
                label="Full Name"
                value={userData.displayName}
            />
            <TextInput
                label="House No. & details"
                onChangeText={text => setHouseNumber(text)}
            />
            <TextInput
                label="Area"
                onChangeText={text => setArea(text)}
            />
            <TextInput
                label="Landmark"
                onChangeText={text => setLandmark(text)}
            />
            <TextInput
                label="Mobile Number"
                value={userData.phone}
            />
            <Picker
                selectedValue={selectedState}
                onValueChange={(itemValue, itemIndex) =>
                setSelectedState(itemValue)
            }>
                <Picker.Item label="Rajasthan" value="Rajasthan" />
            </Picker>
            <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) =>
                setSelectedCity(itemValue)
            }>
                <Picker.Item label="Kota" value="Kota" />
                <Picker.Item label="Baran" value="Baran" />
            </Picker>
            <TextInput
                label="Pincode"
                onChangeText={text => setPincode(text)}
            />
            <Button
                mode="contained"
                labelStyle={{ color:"#fff" }}
                onPress={() => handleSave()}
            >
                Save and continue
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({})
