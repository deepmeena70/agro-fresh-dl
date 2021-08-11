import React from 'react';
import {View, Text, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function PrimaryHeader(props) {

    const {navigation} = props;

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
                    <Text style={styles.location}>Kota</Text>
                    <Text style={styles.subLocation}>Rajasthan</Text>
                </View>
                <MaterialCommunityIcons 
                    name="pencil"
                    color="#37c7ad"
                    style={{ paddingLeft:10, marginRight:135 }}
                    size={24}
                    onPress={() => props.navigate.navigate('DeliveryLocation')}
                />
                <MaterialCommunityIcons 
                    name="bell"
                    color="#37c7ad"
                    size={22}
                    onPress={() => props.navigate.navigate('Notifications')}
                />
                <MaterialCommunityIcons 
                    name="cart"
                    color="#37c7ad"
                    style={{ paddingLeft:20}}
                    size={22}
                    onPress={() => props.navigate.navigate('Cart')}
                />
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
      paddingLeft:20,
      paddingRight:20,
    },
    location: {
      fontSize:20,
      color: '#37C7AD'
    },
    subLocation:{
      color: '#37C7AD'
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
