import React from 'react';
import {View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { Badge } from 'react-native-paper';

import {cartSelector} from '../features/cart'
import {useSelector} from 'react-redux'

export default function PrimaryHeader(props) {

    const {navigation} = props;

    const {items} = useSelector(cartSelector);

    const getItemsCount = () => {
      return items.length;
    }

    const action = () => {
        navigation.toggleDrawer();
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
                <View style={{ paddingLeft: 12}}>
                    <Text style={styles.location}>Baran</Text>
                    <Text style={styles.subLocation}>Rajasthan</Text>
                </View>
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
                      onPress={() => navigation.navigate('Notification')}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
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
    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    //   backgroundColor: 'grey',
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
