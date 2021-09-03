import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SecondaryHeader from '../components/SecondaryHeader';
import { TextInput, Button } from 'react-native-paper';
import {useSelector} from 'react-redux';
import {userDataSelector} from '../features/userData';
import {userSelector} from '../features/user';
import {deliveryAddressSelector} from '../features/deliveryAddress'
import firebase from '../firebase'

export default function EditProfileScreen({navigation}) {
    const {userData} = useSelector(userDataSelector);
    const {user} = useSelector(userSelector);
    const {deliveryAddress} = useSelector(deliveryAddressSelector);

    const [name, setName] = useState(userData.displayName);
    const [houseNumber, setHouseNumber] = useState(deliveryAddress?deliveryAddress.houseNumber:null);
    const [area, setArea] = useState(deliveryAddress?deliveryAddress.area:null);
    const [landmark, setLandmark] = useState(deliveryAddress?deliveryAddress.landmark:null);
    const [state, setState] = useState(deliveryAddress?deliveryAddress.selectedState:null);
    const [city, setCity] = useState(deliveryAddress?deliveryAddress.selectedCity:null);
    const [pincode, setPincode] = useState(deliveryAddress?deliveryAddress.pincode:null);


    const updateData = async () => {
        const deliveryAddressRef = firebase
                                    .firestore()
                                    .collection('deliveryAddress')
                                    .doc(user.uid);

        const snapshot = await deliveryAddressRef.get();

        if(!snapshot.exists){
            console.log('no delivery address')

            const data = {
                houseNumber,
                area,
                landmark,
                selectedState:state,
                selectedCity:city,
                pincode

            }

            deliveryAddressRef.set(data)
                .then(() => {
                    console.log('delivery address added successfully')
                    navigation.navigate('Account');
                })

            return;
        } 

        firebase
            .firestore()
            .collection('users')
            .doc(user)
            .update({
                name,
            });
        
        firebase
            .firestore()
            .collection('deliveryAddress')
            .doc(user)
            .update({
                houseNumber,
                area,
                landmark,
                selectedState:state,
                selectedCity:city,
                pincode
            }).then(() => {
                console.log('delivery address updated successfully')
                navigation.navigate('Account');
            })
    }


    return (
        <View style={{ flex:1 }}>
            <SecondaryHeader navigation={navigation} screenName="Edit Profile" />
            <ScrollView style={{ padding:8 }}>
                <TextInput
                    label="Full Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    mode="outlined"
                    style={styles.textInput}
                />
          
                <TextInput
                    label="House Number"
                    value={houseNumber}
                    onChangeText={text => setHouseNumber(text)}
                    mode="outlined"
                    style={styles.textInput}
                />
                <TextInput
                    label="Area/Locality"
                    value={area}
                    onChangeText={text => setArea(text)}
                    mode="outlined"
                    style={styles.textInput}
                />
                <TextInput
                    label="Landmark(Optional)"
                    value={landmark}
                    onChangeText={text => setLandmark(text)}
                    mode="outlined"
                    style={styles.textInput}
                />
                <TextInput
                    label="State"
                    value={state}
                    onChangeText={text => setState(text)}
                    mode="outlined"
                    style={styles.textInput}
                />
                <TextInput
                    label="City"
                    value={city}
                    onChangeText={text => setCity(text)}
                    mode="outlined"
                    style={styles.textInput}
                />
                <TextInput
                    label="Pincode"
                    value={pincode}
                    onChangeText={text => setPincode(text)}
                    mode="outlined"
                    style={styles.textInput}
                />
                <Button 
                    mode="contained" 
                    style={{ marginBottom:12 }}
                    labelStyle={{ color:"#fff" }}
                    onPress={() => updateData()}
                >
                    Update
                </Button>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput:{
        marginBottom:5
    }
})
