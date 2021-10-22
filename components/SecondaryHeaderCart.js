import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Pressable, ToastAndroid} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Badge } from 'react-native-paper';

import {cartSelector} from '../features/cart'
import {useSelector, useDispatch} from 'react-redux'
import { userSelector } from '../features/user';
import {Picker} from '@react-native-picker/picker';

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

export default function SecondaryHeaderCart(props) {

    const {signIn} = useSelector(userSelector);

    const [visibleToast, setvisibleToast] = useState(false);

    useEffect(() => setvisibleToast(false), [visibleToast]);

    const {navigation, screenName} = props;

    const {items} = useSelector(cartSelector);

    const toCart = () => {
        if(!signIn) {
            return setvisibleToast(true); 
        }
        navigation.navigate('Cart');
      }

    const getItemsCount = () => {
        return items.length;
    }

    return (
        <SafeAreaView style={ styles.header }>
            <MaterialCommunityIcons 
                name="menu"
                size={28}
                color="#fff"
                style={{ paddingLeft:12, paddingTop: 5 }}
                onPress={() =>navigation.toggleDrawer()}
            />
            <View style={ {flex:1, alignItems: 'center'} }>
                <Text style={ styles.headerText }>{screenName}</Text>
            </View>

            <View style={styles.rightIconContainers}>
                  <TouchableOpacity
                    onPress={() => toCart()}
                  >
                    <MaterialCommunityIcons 
                        name="cart"
                        color="#fff"
                        style={{ paddingLeft:20}}
                        size={22}
                    />
                    {getItemsCount() > 0 && 
                        <Badge style={{ position:'absolute', top: -9, left:28 }}>
                          {getItemsCount()}
                        </Badge>
                    }
                  </TouchableOpacity>
                </View>
                <Toast visible={visibleToast} message="Not signed in!" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        height:100,
        backgroundColor: "#37c4ad",
        flexDirection: 'row',
        paddingTop:50
    },
    headerText:{
        paddingTop:2,
        fontSize:24,
        color: "#fff"
    },
    rightIconContainers: { 
        flexDirection: 'row' , 
        justifyContent:'flex-end',
        paddingRight:16
      },
})

