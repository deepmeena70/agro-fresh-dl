import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {fetchUser, userSelector} from '../features/user';
import {useDispatch, useSelector} from 'react-redux';

import SecondaryHeader from '../components/SecondaryHeader'

import firebase from '../firebase'

export default function AddDeliveryAddress({navigation}) {
    const [name, setName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [selectedState, setSelectedState] = useState('Rajasthan');
    const [selectedCity, setSelectedCity] = useState();
    const [pincode, setPincode] = useState('');

    const dispatch = useDispatch();
    const {user} = useSelector(userSelector);

    useEffect(() => {
        dispatch(fetchUser())
    },[dispatch])

    const handleSave = () => {
        console.log(user);

        const data = {
            name,
            houseNumber,
            area,
            landmark,
            mobileNumber,
            selectedState,
            selectedCity,
            pincode
        }

        firebase
            .firestore()
            .collection('deliveryAddress')
            .doc(user)
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
                onChangeText={text => setName(text)}
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
                onChangeText={text => setMobileNumber(text)}
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
