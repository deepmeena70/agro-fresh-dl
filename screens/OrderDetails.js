import React from 'react'
import { View, Text } from 'react-native'

export default function OrderDetails({route, navigation}) {

    console.log("order details>>>",route.params);

    const {orderId} = route.params;

    return (
        <View>
            <Text>{orderId}</Text>
        </View>
    )
}
