import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Pressable, ToastAndroid} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { Badge } from 'react-native-paper';

import {cartSelector} from '../features/cart'
import {useSelector} from 'react-redux'
import {locationSelector} from '../features/location'

import { userSelector } from '../features/user';

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

export default function PrimaryHeader(props) {

    const {signIn} = useSelector(userSelector);

    const {navigation} = props;

    const [visibleToast, setvisibleToast] = useState(false);

    useEffect(() => setvisibleToast(false), [visibleToast]);

    const {location} = useSelector(locationSelector);

    const {items} = useSelector(cartSelector);

    const getItemsCount = () => {
      return items.length;
    }

    const action = () => {
        navigation.toggleDrawer();
      }

    const getLocation = () => {
      return (!location) ? 'Kota' : location;
    }

    const toCart = () => {
      if(!signIn) {
          return setvisibleToast(true); 
                
      }

      navigation.navigate('Cart');
    }

    const toNotification = () => {
      if(!signIn) {
        return setvisibleToast(true);
      }

      navigation.navigate('Notification')
    }
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex:1, flexDirection: 'row'}}>
                <MaterialCommunityIcons 
                    name='menu'
                    color='#37C7AD'
                    size={30}
                    onPress={action}
                />
                <Pressable 
                  style={{ paddingLeft: 12}}
                  onPress={() => navigation.navigate('Location')}
                  >
                    <Text style={styles.location}>
                    {getLocation()}
                    </Text>
                    <Text style={styles.subLocation}>Rajasthan</Text>
                </Pressable>
                <MaterialCommunityIcons 
                    name="pencil"
                    color="#37c7ad"
                    style={{ paddingLeft:10 }}
                    size={24}
                    onPress={() => navigation.navigate('Location')}
                />
                <View style={styles.rightIconContainers}>
                  <MaterialCommunityIcons 
                      name="bell"
                      color="#37c7ad"
                      size={22}
                      onPress={() => toNotification()}
                  />
                  <TouchableOpacity
                    onPress={() => toCart()}
                  >
                    <MaterialCommunityIcons 
                        name="cart"
                        color="#37c7ad"
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
            </View>

            <View style={styles.inputContainer} >
                <TextInput
                style={styles.input}
                placeholder="Search..."
                />
                <MaterialCommunityIcons
                name="magnify"
                color="#37c7ad" 
                style={{ marginTop:5, paddingRight:6 }}
                size={22}
                />
                
            </View>
            <Toast visible={visibleToast} message="Not signed in!" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    //backgroundColor: 'grey',
      height:150,
      paddingTop:50,
      paddingLeft:12,
      paddingRight:12,
    },
    location: {
      fontSize:18,
      color: '#37C7AD'
    },
    subLocation:{
      fontSize:12,
      color: '#37C7AD'
    },
    rightIconContainers: { 
      flex:1, 
      flexDirection: 'row' , 
      justifyContent:'flex-end'
    },
    inputContainer:{
      height:34,
      borderWidth: 1,
      borderColor:'#37C7AD',
      flexDirection: 'row',
      borderRadius: 7,
    },
    input: {
      height: 34,
      paddingLeft:20,
      flex:1
    },

  })
