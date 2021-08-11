import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// components
import SecondaryHeader from '../components//SecondaryHeader'

export default function ReferAndEarnScreen({navigation}) {
    return (
        <View style={styles.container}>
        <SecondaryHeader navigation={navigation} screenName="Refer & Earn" />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
