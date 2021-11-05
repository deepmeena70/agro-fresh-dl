import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
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
        processing();
        orderPlaced();
    }, [orderId]);

    const processing = () => {
        try{
            const approved = orderDetail.orderApproved;
            const processed = orderDetail.orderProcessed;
            const shipping = orderDetail.orderShipping;
            const delivered = orderDetail.orderDelivered;

            if(approved && processed && shipping && delivered) {
                setCurrentPosition(4);
            } else if(approved && processed && shipping) {
                setCurrentPosition(3);
            } else if(approved && processed) {
                setCurrentPosition(2);
            } else if(approved) {
                setCurrentPosition(1);
            } else {
                setCurrentPosition(0);
            }
        }catch(e) {
            console.log(e);
        }

    }

    console.log("order detail >>>", orderDetail);

    const time = (seconds, nanoseconds) => {
        if(seconds === null) {
        const date = new Date();
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        }
        let totalTime = (seconds+nanoseconds*0.00000001)*1000;
        const date =  new Date(totalTime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    const items = () => {
        try{
            const item = JSON.parse(orderDetail.orderDetails);
            console.log("items >>>", item);
            return (
                item.items.map((item, key) =>{
                    return(
                        <View key={key} style={styles.card}>
                            <View style={{ flex:1, flexDirection:"row" }}>
                                <View style={{ flex:.3 }}>
                                    {
                                        item[0].productCategory ?
                                        <Image 
                                            source={require('../assets/freshbasket.png')}
                                            style={{width:100, height:100}}
                                        />
                                        :
                                        <Image style={{ width:100, height:100 }} 
                                            source={{ uri: `${item[0].imageURL}` }}
                                        />
                                       
                                    }
                                </View>
                                <View style={{ paddingLeft:12, flex:.7 }}>
                                    <Text style={{ fontSize:22 }}>{item[0].productName}</Text>
                                    <Text style={{ fontSize:14, marginTop:3 }}>₹{item[0].discountPrice?item[0].discountPrice:item[0].sellingPrice}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })
                
            )
        } catch (err) {
            console.log(err);
        }
    }

    const total = () => {
        try{
            const item = JSON.parse(orderDetail.orderDetails);

            return (
                <>
                    <Text>Shipping Charge ₹ {item.deliveryCharge}</Text>
                        
                    <Text>
                        Total {Number(item.grandTotal + item.totalDiscountBulk+item.totalDiscountRegular).toFixed(2)}
                    </Text>
                    
                    <Text>Discount -₹{item.totalDiscountBulk+item.totalDiscountRegular}</Text> 
                    <Text>Grand Total ₹ {item.grandTotal}</Text>
                </>
            )
        } catch(e) {
            console.log(e);
        }
    }

    const deliveryAddress = () => {
        try{
            const item = JSON.parse(orderDetail.orderDetails);
            console.log("items >>>", item);

            return (
                     <View style={{ paddingBottom: 34 }}>
                         <Text>
                            {item.deliveryAddress.houseNumber}, 
                         </Text>
                         <Text>
                            {item.deliveryAddress.area},
                            {item.deliveryAddress.landmark},
                            {item.deliveryAddress.selectedCity},
                         </Text>
                         <Text>
                            {item.deliveryAddress.selectedState}
                            - {item.deliveryAddress.pincode}
                         </Text>
                     </View>   
                )
                
            
        } catch (err) {
            console.log(err);
        }
    }
   
    
    return (
        <View style={styles.container}>
            <SecondaryHeader navigation={navigation} screenName="Order Details" />
            <ScrollView>

                <View style={styles.cardType2}>
                    <View style={styles.orderDetails}>
                        <Text>order {orderId}</Text>
                        <Text></Text>
                    </View>
                    <View
                            style={{
                                borderBottomColor: 'lightgrey',
                                borderBottomWidth: 1,
                                marginTop:3, 
                                marginBottom:12
                            }}
                        />
                    <Text style={{ margin:12 }}>Order Tracking</Text>
                    <StepIndicator
                            customStyles={customStyles}
                            currentPosition={currentPosition}
                            labels={labels}
                    />
                </View>

                {items()}

                {
                    orderDetail &&
                    <View style={styles.cardType2}>
                        <Text>
                            Ordered, {time(orderDetail.orderCreatedAt.seconds, orderDetail.orderCreatedAt.nanoseconds)}
                        </Text>
                        <Text>Delivered, </Text>
                        <View
                            style={{
                                borderBottomColor: 'lightgrey',
                                borderBottomWidth: 1,
                                marginTop:12, 
                                marginBottom:12
                            }}
                        />
                        <View>
                            <Text style={{ fontSize:14, fontWeight: 'bold', color: 'grey'}}>Shipping Details</Text>
                            {deliveryAddress()}
                        </View>
                    </View>
                }
                {
                    <View style={styles.cardType2}>
                        <Text style={{ fontSize:14, color: 'grey', fontWeight:'bold' }}>Price Details</Text>
                        {total()}
                    </View>
                }

            </ScrollView>

            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    orderDetails: {
        padding:12
    },
    card:{
        height:150,
        width:"98%",
        backgroundColor:"white",
        borderRadius:1,
        marginTop:1,
        padding:10,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
        marginLeft:"1%"
      },
    cardType2:{
        height:200,
        width:"98%",
        backgroundColor:"white",
        borderRadius:1,
        marginTop:1,
        padding:10,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
        marginLeft:"1%"
      }
})


