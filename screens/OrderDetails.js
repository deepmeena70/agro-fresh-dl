import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StepIndicator from 'react-native-step-indicator';
import SecondaryHeader from '../components/SecondaryHeader';
import firestore from '@react-native-firebase/firestore';

const labels = ["Approval","Processing","Shipping","Delivery"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#37c4ad',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#37c4ad',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#37c4ad',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#37c4ad',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#37c4ad',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#37c4ad'
}

export default function OrderDetails({route, navigation}) {

    console.log("order details>>>",route.params);

    const {orderId} = route.params;


    const [orderDetail, setOrderDetail] = useState();

    const [currentPosition, setCurrentPosition] = useState(1);


    const orderPlaced = async () => {
        try{
            const orderRef = firestore().
                            collection('orders')
            const snapshot = await orderRef.where('orderId', '==', orderId).get();

            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            snapshot.forEach(doc => {
                setOrderDetail(doc.data())
            });
        } catch (e) {
            console.log(e.message);
        }
            
    }

    useEffect(() =>{
        setOrderDetail();
        orderPlaced();
    }, [orderId]);

    console.log("order detail >>>", orderDetail);

    
    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="Order Details" />
            <View style={styles.orderDetails}>
                <Text>order {orderId}</Text>
                <Text></Text>
            </View>
            <Text style={{ margin:12 }}>Order Tracking</Text>
            <StepIndicator
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    labels={labels}
                />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    orderDetails: {
        padding:12
    }
})
