import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import {useSelector} from 'react-redux';
import {userSelector} from '../features/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// components
import SecondaryHeader from '../components//SecondaryHeader'


export default function MyOrdersScreen({navigation}) {

    const {user} = useSelector(userSelector);

    const initialArray = [];
    const [orderListArr, setOrderListArr] = useState(initialArray);

    const orderlist = async () => {
        try{
            const orderRef = firestore().
                            collection('orders')
            const snapshot = await orderRef.where('uid', '==', user.uid).limit(3).get();

            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            snapshot.forEach(doc => {
                setOrderListArr((oldArray) => [...oldArray, doc.data()] )
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        setOrderListArr(initialArray);
        orderlist()
    }, [user]);

    const orderPressableHandler = (orderId) => {
        navigation.navigate('OrderDetails', {
            orderId: orderId
        })
    }
   
    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="My Orders" />
            <ScrollView>
            {
                orderListArr.map((items, key) => {
                    const orderId = items.orderId
                    const orderDetails = JSON.parse(items.orderDetails)
                    const item = orderDetails.items;
                    const buyer = orderDetails.user;
                   return ( 
                        <Pressable onPress={() => orderPressableHandler(orderId)} style={styles.card} key={key}>
                                <Text style={{ color:'grey'}}>order {orderId}</Text>
                                <View style = {styles.lineStyle} />
                                <View style={{ flexDirection:'row' }}>
                                    <View style={{ flex:0.96 }}>
                                        <View style={{ flexDirection:'row' }}>
                                            <Text style={{ color: 'grey', marginRight:4 }}>delivering to</Text>
                                            <Text>{buyer}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                        {
                                            item.map((product, key) => {
                                            return (
                                                <Text key={key}>{product[0].productName} , </Text>
                                            )
                                            })
                                        }
                                        </View>
                                        <Text>Expected delivery</Text>
                                    </View>
                                    <View style={{ justifyContent:'center', alignItems: 'center'}}>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            color="grey"
                                            size={28}
                                        />
                                    </View>
                                </View>
                           
                        </Pressable>
                    )
                })
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    card:{
        height:150,
        width: "98%",
        backgroundColor:"white",
        borderRadius:4,
        padding:10,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        margin:4 
      },
      lineStyle:{
        borderWidth: 0.2,
        borderColor:'grey',
        marginTop:10,
        marginBottom:10
   }
})
