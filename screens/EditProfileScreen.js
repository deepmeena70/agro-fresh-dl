import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import SecondaryHeader from '../components/SecondaryHeader';
import { TextInput, Button } from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {userDataSelector, clearUserData, fetchUserData} from '../features/userData';
import {userSelector, clearUser} from '../features/user';
import {deliveryAddressSelector} from '../features/deliveryAddress'
import firestore from '@react-native-firebase/firestore';
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

export default function EditProfileScreen({navigation}) {
    const {userData} = useSelector(userDataSelector);
    const {user} = useSelector(userSelector);
    const {deliveryAddress} = useSelector(deliveryAddressSelector);

    const [name, setName] = useState(userData?userData.displayName:null);
    const [phone, setPhone] = useState(userData?userData.phone:null);
    const [houseNumber, setHouseNumber] = useState(deliveryAddress?deliveryAddress.houseNumber:null);
    const [area, setArea] = useState(deliveryAddress?deliveryAddress.area:null);
    const [landmark, setLandmark] = useState(deliveryAddress?deliveryAddress.landmark:null);
    const [state, setState] = useState(deliveryAddress?deliveryAddress.selectedState:null);
    const [city, setCity] = useState(deliveryAddress?deliveryAddress.selectedCity:null);
    const [pincode, setPincode] = useState(deliveryAddress?deliveryAddress.pincode:null);
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        fetchUserData(user);
    }, [dispatch]);

    const capitalizeName = (text) => {
        const str = text;
        const strCapitalizedArr = [];
        const strArr = str.split(" ");
        strArr.forEach(item => {
          strCapitalizedArr.push(item.charAt(0).toUpperCase() + item.toLowerCase().slice(1));
        })
         return strCapitalizedArr.join(' ');
      }


    async function sendCodeHandler() {
        showToastWithGravityAndOffset("OTP sent")
        const confirmation = await auth().verifyPhoneNumber(`+91${phone}`);
        setConfirm(confirmation);
      }

     // Handle confirm code button press

    const updateData = async () => {
        if(
            name === (undefined || '' || null)
            || houseNumber === (undefined || '' || null)
            || area === (undefined || '' || null)
            || city === (undefined || '' || null)
            || pincode === (undefined || '' || null)
        ) {
            if(!userData.email) {
                if(email === (undefined || '' || null)) {
                    return showToastWithGravityAndOffset("Email is required")
                }
                if(
                    password !== confirmPassword
                ) {
                    return showToastWithGravityAndOffset("Password does not match")
                } else if(password === (undefined || '' || null)) {
                    return showToastWithGravityAndOffset("Enter valid password")
                }
            }

            if(!userData.phone) {
                if(phone === (undefined || '' || null)) {
                    return showToastWithGravityAndOffset("Enter valid phone number")
                }
            }
            return showToastWithGravityAndOffset("Fields are required")
        }

        if(!userData.email) {
            const credential = auth.EmailAuthProvider.credential(email, password);
            auth()
                .currentUser
                .linkWithCredential(credential)
                .catch(err => {
                    console.log(err.message);
                    showToastWithGravityAndOffset("Email update failed")
                })
            
            dispatch(clearUser());
        
        }
        if(!userData.phone) {
            try {
                const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
                auth().currentUser
                  .linkWithCredential(credential)
                  .catch(err => {
                      console.error(err.message);
                      showToastWithGravityAndOffset("Already Verified")
                  });
              } catch (error) {
                if (error.code == 'auth/invalid-verification-code') {
                  showToastWithGravityAndOffset("OTP invalid")
                } else if (error.code == 'auth/invalid-phone-number'){
                  showToastWithGravityAndOffset("Invalid phone number")
                } else if (error.code == 'auth/phone-number-already-exists') {
                  showToastWithGravityAndOffset("Phone number already exists")
                } else {
                  showToastWithGravityAndOffset("Phone authentication failed")
                }
              }
            dispatch(clearUser());

        }
        
        const deliveryAddressRef = firestore()
                                    .collection('deliveryAddress')
                                    .doc(user.uid);

        const snapshot = await deliveryAddressRef.get();

        const data = {
            houseNumber:!houseNumber?'':houseNumber,
            area:!area?'':area,
            landmark:!landmark?'':landmark,
            selectedState:!state?'Rajasthan':state,
            selectedCity:!city?'':city,
            pincode:!pincode?'':pincode

        }

        if(!snapshot.exists){
            console.log('no delivery address')

            deliveryAddressRef.set(data)
                .then(() => {
                    console.log('Delivery address added successfully')
                    showToastWithGravityAndOffset("Successfully updated")
                })
            
        } else {
            deliveryAddressRef
                .collection('deliveryAddress')
                .doc(user.uid)
                .delete()
                .then(() => {
                    deliveryAddressRef.set(data)
                    .then(() => {
                        console.log('Delivery address added successfully')
                        showToastWithGravityAndOffset("Successfully updated")
                    })
                });

            
        } 

            if(name !== userData.displayName) {
                auth().currentUser.updateProfile({
                    displayName: capitalizeName(name)
                }).then(()=> {
                    showToastWithGravityAndOffset("Sign in again")
                    dispatch(clearUser());
                })
            }
        
            firestore()
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
                {
                    !user.email && 
                    <>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            mode="outlined"
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            mode="outlined"
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                            mode="outlined"
                            style={styles.textInput}
                        />
                    </>
                }
                <View>
                    <TextInput
                        label="Phone"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        mode="outlined"
                        style={styles.textInput}
                        placeholder="999 999 9999"
                        editable={!userData.phone?true:false}
                    />
                {
                    !userData.phone && 
                        <Button onPress={sendCodeHandler} style={{ position:'absolute', right:0, marginTop:14, zIndex:1 }}>Verify</Button>
                }
                </View>

                {
                    !userData.phone && 
                    <TextInput
                        label="Enter OTP"
                        value={code}
                        onChangeText={text => setCode(text)}
                        mode="outlined"
                        style={styles.textInput}
                        keyboardType="numeric"
                    />
                }
          
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
                    keyboardType="numeric"
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
