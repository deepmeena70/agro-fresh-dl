import React,{useState} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import SecondaryHeader from '../components/SecondaryHeader'
import {useDispatch} from 'react-redux';
import {fetchLocation} from '../features/location';

export default function LocationScreen({navigation}) {

    const dispatch = useDispatch();   

    const changeLocation = (item) => {
        dispatch(fetchLocation(item));
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="Select Location" />
            <FlatList
            data={[
                {key: 'Kota'},
                {key: 'Baran'},
            ]}
            renderItem={({item}) => <TouchableOpacity
                onPress={() => {changeLocation(item.key)}}
            >
                <Text style={styles.item}>{item.key}</Text>
            </TouchableOpacity>}
            />
            {/* <Button
                mode="contained"
                onPress={() => changeLocation()}
                labelStyle={{ color:"#fff" }}
            >
                Update
            </Button> */}
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
