import React from 'react'
import { View, Text, StyleSheet, SafeAreaView} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function SecondaryHeader(props) {

    const {navigation, screenName} = props;

    return (
        <SafeAreaView style={ styles.header }>
            <MaterialCommunityIcons 
                name="arrow-left"
                size={28}
                color="#fff"
                style={{ paddingLeft:12, paddingTop: 5 }}
                onPress={() =>navigation.navigate('Home')}
            />
            <View style={ {flex:.88, alignItems: 'center'} }>
                <Text style={ styles.headerText }>{screenName}</Text>
            </View>
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
})

