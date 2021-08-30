import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import {fetchOffers, clearOffers, offersSelector} from '../features/offers'

import { Card, Title, TouchableRipple } from 'react-native-paper';

import SecondaryHeader from '../components/SecondaryHeader';

export default function OffersScreen({navigation}) {
    const dispatch = useDispatch()
    const {offers} = useSelector(offersSelector);

    useEffect(() => {
        dispatch(clearOffers());
        dispatch(fetchOffers());
    }, [dispatch])

    const handlePress = (item) => {
        console.log('handle press')
        navigation.navigate('Cart',{item});
    }

    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="Offers"/>
            {offers.map((item, index) =>  
                
               <TouchableRipple onPress={() =>handlePress(item)}>
                    <Card>
                        <Card.Content>
                        <View style={{ flexDirection: 'row'}}>
                            <View style={{ flex:1, alignItems:'flex-start'}}> 
                                <Title>
                                    {item.offerCode}
                                </Title>
                            </View>
                            <View style={{ flex:1, alignItems:'flex-end',justifyContent:'center' }}>
                                <Title>{item.discount} %</Title>
                            </View>
                        </View>
                        </Card.Content>
                    </Card>
               </TouchableRipple>
                
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
