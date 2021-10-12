import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import { Avatar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {useDispatch, useSelector} from 'react-redux'
import {userSelector} from '../features/user'
import {getDeliveryAddress, deliveryAddressSelector, clearDeliveryAddress} from '../features/deliveryAddress';
import {userDataSelector} from '../features/userData'
import SecondaryHeader from '../components/SecondaryHeader'

export default function AccountScreen({navigation}) {
    const dispatch = useDispatch();
    
    const {user,loading, hasErrors, signIn} = useSelector(userSelector)
    const {userData, userDataLoading, hasUserDataErrors} = useSelector(userDataSelector)
    const {deliveryAddress} = useSelector(deliveryAddressSelector);

    useEffect(() => {
        dispatch(getDeliveryAddress(user.uid));
    }, [dispatch, deliveryAddress]);

    const userName = () => {
        const nameArray = String(userData.displayName).split('');
        return nameArray[0];
    }

    const addDeliveryAddressHandler = () => {
        navigation.navigate("EditProfile")
    }

    const updatePhoneHandler = () => {
        navigation.navigate("EditProfile")
    }

    return (
        <View style={styles.mainContainer}>
            <SecondaryHeader navigation={navigation} screenName="Account"/>
            <View style={styles.container1}>
                <View style={{ flex:3, alignItems: 'center'}}>
                    <Avatar.Text 
                        size={80}
                        label={userName()}
                        color="#37c4ad"
                        style={{ backgroundColor:"#fff",marginTop:0 }}
                    />
                    <Text style={styles.container1Text}>{userData?userData.displayName:''}</Text>
                    <Pressable style={styles.container1Row}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Text style={styles.container1RowText}>Edit</Text>
                        <MaterialCommunityIcons 
                            name="pencil"
                            size={22}
                            color="#fff"
                            style={{ marginLeft:3 }}
                        />
                    </Pressable>
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.row}>
                    <MaterialCommunityIcons 
                        name="account"
                        size={28}
                        color="grey"
                    />
                    <Text style={styles.rowText}>{userData?userData.displayName:''}</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons 
                        name="cellphone"
                        size={28}
                        color="grey"
                    />
                    <Text style={styles.rowText}>
                        {
                            userData?userData.phone:null
                            
                        }
                        {
                            !userData.phone && 
                                <Pressable onPress={updatePhoneHandler}>
                                    <Text style={{ color:"#37c4ad" }}>Update</Text>
                                </Pressable>
                        }
                    </Text>
                   
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons 
                        name="email"
                        size={28}
                        color="grey"
                    />
                    <Text style={styles.rowText}>{userData?userData.email:''}</Text>
                </View>
              
                <View style={styles.rowAddress}>
                    <MaterialCommunityIcons 
                        name="map-marker"
                        size={28}
                        color="grey"
                    />
                    {deliveryAddress && 
                        <Text style={styles.rowText}>
                            {deliveryAddress.houseNumber}, 
                            {" "+deliveryAddress.area}, 
                            {" "+deliveryAddress.landmark}, 
                            {" "+deliveryAddress.selectedCity}, 
                            {" "+deliveryAddress.selectedState}, 
                            {" "+deliveryAddress.pincode}
                        </Text>
                    }
                    {
                        !deliveryAddress && 
                            <Pressable onPress={addDeliveryAddressHandler}>
                                <Text style={{ color:"#37c4ad" }}>Add Delivery Address</Text>
                            </Pressable>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    container1:{
        flex:.3,
        backgroundColor:'#37C7AD',
        paddingTop:40
    },
    container1Text:{
        color:'#fff',
        fontSize:24,
        marginTop:12,
    },
    container2:{
        flex:.7,
        paddingRight:100
    },
    container1Row:{
        flex:1,
        flexDirection:'row',
        marginTop:6

    },
    container1RowText:{
        color:"#fff",
        fontSize:16,
        textDecorationLine:'underline',
        marginLeft:12
    },
    row:{
        flex:.085,
        flexDirection:'row',
        marginLeft:12,
        marginTop:24
    },
    rowAddress:{
        flex:.7, 
        flexDirection: 'row',
        marginLeft:12,
        marginTop:24,
        justifyContent: 'flex-start',
        paddingRight:50

    },
    rowText:{
        marginLeft:12,
        paddingTop:5,
        flexGrow:1
    }
})
