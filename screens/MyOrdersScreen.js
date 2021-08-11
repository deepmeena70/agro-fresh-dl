import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// components
import SecondaryHeader from '../components//SecondaryHeader'

export default function MyOrdersScreen({navigation}) {
    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="My Orders" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})
