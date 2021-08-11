import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AboutUsScreen() {
    return (
        <View style={styles.container}>
            <Text>About us</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

