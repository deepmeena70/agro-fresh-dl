import React,{useState, useRef, useEffect} from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, IconButton, Colors, TextInput } from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {cartSelector, deleteFromCart, changeQty, changeQtyBasket} from '../features/cart';
import {getCartDetails} from '../features/cartDetails';

import SecondaryHeader from '../components/SecondaryHeader'
import {getDeliveryAddress, clearDeliveryAddress, deliveryAddressSelector} from '../features/deliveryAddress'
import { userSelector } from '../features/user';


export default function CartScreen({route, navigation}) {

    const dispatch = useDispatch();
    const {items} = useSelector(cartSelector);
    const {user} = useSelector(userSelector);
    const {deliveryAddress} = useSelector(deliveryAddressSelector);

    const [code, setCode] = useState('');

    useEffect(() => {
        dispatch(clearDeliveryAddress())
        dispatch(getDeliveryAddress(user.uid))
    },[dispatch]);

    const deleteItem = (name) => {
        dispatch(deleteFromCart(name))
    }
    
    const handlePlus = (item) => {
        console.log('plus=>', item.productName);
        if(item.productCategory) {
            return dispatch(changeQtyBasket(item.productName, true))
        }
        dispatch(changeQty(item.productName, true));

        console.log('plus called', items)
    }

    const handleMinus = (item) => {
        console.log('minus=>', item.productName);
        if(item.productCategory) {
            return dispatch(changeQtyBasket(item.productName, false))
        }
        dispatch(changeQty(item.productName, false));

        console.log('Minus called',items)
    }

    const getSubTotal = (orderType) => {
        let total = 0;
        
        if(orderType === 'regular') {
            items.map(product => {
                if(product[0].regular){
                    total += Number(product[0].sellingPrice)*product[2];
                    console.log('product 2>>>',product[2]);
                }
            })
        } else if (orderType === 'bulk')  {
            items.map(product => {
                if(product[0].bulk){
                    total += Number(product[0].sellingPrice)*product[2];
                }
            })
        } else {
            items.map(product => {
                if(product[0].productCategory){
                    total += Number(product[0].sellingPrice)*product[2];
                }
            })
        } 

        return total;
    }

    const getTotalDiscount = (orderType) => {
        let totalDiscount = 0;
       
        if(orderType === 'regular') {
            items.map(product => {
                if(product[0].regular) {
                    totalDiscount += Number(product[0].discountPrice)*product[2]; 
                }
            })
            totalDiscount = getSubTotal('regular')-totalDiscount;
        } else {
            items.map(product => {
                if(product[0].bulk) {
                    totalDiscount += Number(product[0].discountPrice)*product[2];
                }
            })
            totalDiscount = getSubTotal('bulk')-totalDiscount;
        }

        return totalDiscount;
    }

    const getOfferDiscount = () => {
        let offerCodeDiscount;
        try{
            offerCodeDiscount = route.params.item.discount;
        } catch(e){
            offerCodeDiscount = 0;
        }

        return offerCodeDiscount;
    }

    const getGrandTotal = () => {
      
        const total =  getTotal('regular') + getTotal('bulk') + getTotal();

        const deliveryCharge = (typeof getDeliveryCharge() === 'string') ? 0 : getDeliveryCharge();

        const grandTotoal = (total - total*getOfferDiscount()*0.01) + deliveryCharge;

        return grandTotoal.toFixed(2);
    }

    const getAllSaving = () => {
        return getTotalDiscount('regular') + getTotalDiscount() + [getTotal('regular') + getTotal('bulk')]*getOfferDiscount()*0.01;
    }

    const getTotal = (orderType) => {
        if(orderType === 'regular') {
            return getSubTotal('regular') - getTotalDiscount('regular');
        } else if(orderType === 'bulk') {
            return getSubTotal('bulk') - getTotalDiscount('bulk');
        } else {
            return getSubTotal();
        }
    }

    const getDeliveryCharge = () => {
        const total = getTotal('regular') + getTotal('bulk') + getTotal();
        if(total === 0) {
            return 0;
        }

        if(total > 200) {
            return 'Free'
        }
        return 100;
    }

    const getCode = () => {
        if(route) {
            try{
                return route.params.item.offerCode;
            } catch(e){
                return code;
            }
        }
        return code;
    }

    const handleProceed = () => {
        const details = {
            'items': items,
            'totalDiscountRegular': getTotalDiscount('regular'),
            'subTotalRegular': getSubTotal('regular'),
            'totalRegular': getTotal('regular'),
            'subTotalBulk': getSubTotal('bulk'),
            'totalBulk': getTotal('bulk'),
            'totalDiscountBulk': getTotalDiscount(),
            'offerCode': getCode(),
            'offerDiscount': getOfferDiscount(),
            'deliveryCharge': getDeliveryCharge(),
            'grandTotal' : getGrandTotal(),
            'allSaving' : getAllSaving(),
            'user' : user.displayName,
            'deliveryAddress': deliveryAddress,
            'email':user.email,
            'phone': user.phoneNumber
        }

        dispatch(getCartDetails(details));

        if(deliveryAddress !== null) {
            return navigation.navigate('OrderSummary')
        }
        return navigation.navigate('AddDeliveryAddress')
    }

  

    return (
        <View style={styles.mainContainer}>
            <SecondaryHeader navigation={navigation} screenName="Cart" />
            <ScrollView style={styles.container}>
                {
                items.map((product, key) => 
                    
                    <View style={product[0].productCategory?styles.cardFreshBasket:styles.card} key={key}>
                        <View style={styles.productContainer}>
                            {
                                product[0].productCategory?
                                <Image 
                                    source={{ uri:'https://imgcdn.floweraura.com/fruitilicious-basket-9932240co.jpg' }}
                                    style={ styles.thumbnail }
                                />
                                :
                                <Image 
                                    source={{ uri:product[0].imageURL }}
                                    style={ styles.thumbnail }
                                />
                            }
                            <View style={styles.productDescription}>
                                <Text style={ styles.prodTitle }>{product[0].productName}</Text>
                                <View style={ styles.priceContainer }>
                                    {
                                        (!product[0].discountPrice ?
                                            <Text style={{ fontSize:12,  }}>₹ {product[0].sellingPrice}/
                                            {
                                                product[0].productCategory?
                                                "unit": "kg"
                                            }
                                            </Text> :
                                            <Text style={ styles.rate }>₹ {product[0].sellingPrice}/
                                            {
                                                product[0].productCategory?
                                                "unit": "kg"
                                            }
                                            </Text>
                                               
                                        )
                                    }
                                    {
                                        product[0].productCategory?
                                        null
                                        :
                                        <Text style = { styles.discountRate }> {(product[0].discountPrice)?"₹"+product[0].discountPrice+"/kg":null}</Text>
                                    }
                                </View>
                                <View style={ styles.pickerContainer }>
                                    {
                                        product[0].productCategory?
                                        <Text>{product[0].bucketItems.toString().replace(/,/g,"+")}</Text>
                                        :
                                        <Text style={{ color:'grey' }}> 
                                        {product[1] === undefined ? 'No Packaging' : `Packaging of ${product[1]}`}</Text>
                                    }
                                </View>
                                {   
                                    product[0].minOrderQty?
                                    <Text style={ styles.minimumQty }>Minimum Quantity {product[0].minOrderQty}kgs</Text>
                                    :
                                    null
                                }
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <IconButton
                                        icon="minus-circle"
                                        color={Colors.red500}
                                        size={20}
                                        onPress={() => handleMinus(product[0])}
                                    />
                                    <Text>{product[2].toFixed(1)}</Text>
                                    <IconButton
                                        icon="plus-circle"
                                        color="#37c7ad"
                                        size={20}
                                        onPress={() => handlePlus(product[0])}
                                    />
                                </View>
                                <View style={{ flex:1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <IconButton
                                    icon="delete"
                                    color={Colors.red500}
                                    size={20}
                                    onPress={() => deleteItem(product[0].productName)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                )
            }

            {
                items.length === 0 &&  
                <View style={{ flex:1, alignItems: 'center',marginTop:12}}>
                    <Text style={{ color:'grey', fontSize:20 }}>Your cart is empty!</Text>
                </View>
            }

            <View style={styles.offerContainer}>
                <TextInput 
                    label="OFFER CODE"
                    value={getCode()}
                    onChangeText={text => setCode(text)}
                    mode="outlined"
                    outlineColor="#37c7ad"
                />
                <Button icon="gift" mode="contained" onPress={() =>navigation.navigate('Offers') } labelStyle={{ color: "white" }}>
                    View Offers
                </Button>
            </View>

            {
                getSubTotal('regular') > 0 && 

                <View style={styles.cartDetails}>
                    <View style={styles.cartDetailsRow}>
                        <View style={{flex:1, alignItems:'flex-start' }}>
                            <Text style={{ fontSize:15 }}>Category</Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={{ fontSize:15 }}>Regular Order</Text>
                        </View>
                    </View>
                    <View style={styles.cartDetailsRow}>
                        <View style={{flex:1, alignItems:'flex-start' }}>
                            <Text style={{ color:'red',fontSize:15 }}>Discount</Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={{ color:'red',fontSize:15 }}>₹{getTotalDiscount('regular').toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.cartDetailsRow}>
                        <View style={{flex:1, alignItems:'flex-start' }}>
                            <Text style={{ fontSize:15 }}>Subtotal</Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={{ fontSize:15 }}>₹{getSubTotal('regular').toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.cartDetailsRow}>
                        <View style={{flex:1, alignItems:'flex-start' }}>
                            <Text style={{ fontSize:18 }}>Total</Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={{ fontSize:18 }}>₹{getTotal('regular').toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            
            }

    
            {
                getSubTotal('bulk') > 0 &&

                <View style={styles.cartDetails}>
                    <View style={styles.cartDetailsRow}>
                        <View style={{flex:1, alignItems:'flex-start' }}>
                            <Text style={{ fontSize:15 }}>Category</Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={{ fontSize:15 }}>Bulk Order</Text>
                        </View>
                    </View>
                    <View style={styles.cartDetailsRow}>
                        <View style={{flex:1, alignItems:'flex-start' }}>
                            <Text style={{ color:'red',fontSize:15 }}>Discount</Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={{ color:'red',fontSize:15 }}>₹{getTotalDiscount().toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.cartDetailsRow}>
                        <View style={{flex:1, alignItems:'flex-start' }}>
                            <Text style={{ fontSize:15 }}>Subtotal</Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={{ fontSize:15 }}>₹{getSubTotal('bulk').toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.cartDetailsRow}>
                        <View style={{flex:1, alignItems:'flex-start' }}>
                            <Text style={{ fontSize:18 }}>Total</Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={{ fontSize:18 }}>₹{getTotal('bulk').toFixed(2)}</Text>
                        </View>
                    </View>
                </View> 
                
            }

            {
                getGrandTotal() > 0 && 
                <View style={styles.grandTotal}>
                    <View style={{ flex:1,alignItems:'flex-start' }}>
                        <Text style={{ fontWeight: 'bold', fontSize:16, color:'#37c7ad' }}>You Saved</Text>
                    </View>
                    <View style={{ flex:1,alignItems:'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize:16, color:'#37c7ad' }}>
                            ₹{getAllSaving().toFixed(2)}
                        </Text>
                    </View>
                </View>
            }
            {
                getGrandTotal() > 0 && 
                <View style={styles.grandTotal}>
                    <View style={{ flex:1,alignItems:'flex-start' }}>
                        <Text style={{ fontSize:16 }}>Delivery Charge</Text>
                    </View>
                    <View style={{ flex:1,alignItems:'flex-end' }}>
                        <Text style={{ fontSize:16, color:'black' }}>
                            {typeof getDeliveryCharge() === 'string' && getDeliveryCharge()}
                            {typeof getDeliveryCharge() === 'number' && `₹${getDeliveryCharge()}`}
                        </Text>
                    </View>
                </View>
            }
            {
                getGrandTotal() > 0 && 
                <View style={styles.grandTotal}>
                    <View style={{ flex:1,alignItems:'flex-start' }}>
                        <Text style={{ fontWeight: 'bold', fontSize:16 }}>Grand Total</Text>
                    </View>
                    <View style={{ flex:1,alignItems:'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize:16 }}>
                            ₹{getGrandTotal()}
                        </Text>
                    </View>
                </View>
            }
            
        

        
            </ScrollView>
            {items.length > 0 &&
                <View>
                    <Button mode="contained" onPress={() => handleProceed()} labelStyle={{ color:"white" }}>Proceed to Pay</Button>
                </View>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1
    },
    container:{
        flex:1,
        paddingLeft:12,
        paddingRight: 4
    },
    productContainer:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    card:{
        marginTop:12,
        height:110,
        width:"98%",
        backgroundColor:"white",
        borderRadius:1,
        padding:6,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1, 
    },
    cardFreshBasket:{
        marginTop:12,
        height:130,
        width:"98%",
        backgroundColor:"white",
        borderRadius:1,
        padding:6,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1, 
    },
    thumbnail:{
        height:90, 
        width:100
    },productDescription:{
        flex:.94, 
        paddingLeft:12 
    },
    prodTitle:{
        fontSize: 18, 
        color:"#000"
    },
    priceContainer:{
        flexDirection: 'row', 
        paddingTop: 4
    },
    rate:{
        fontSize:12, 
        textDecorationLine:'line-through'
    },
    discountRate:{
        color:"#37c7ad", 
        paddingLeft:12, 
        fontSize:12
    },
    pickerContainer:{
        flex:1, 
        marginTop: 6
    },
    picker:{
        height:20, 
        width:100
    },
    pickerItem:{
        fontSize:14, 
        color: "grey"
    },
    minimumQty:{
        color:'red', 
        fontSize:12, 
        paddingTop:4
    },
    offerContainer:{
        marginTop:12,
        width: `${98}%` 
    },
    cartDetails:{
        width: `${98}%`,
        marginTop:12,
        marginBottom:12,
        borderWidth:1,
        borderColor:"#37c7ad",
        padding:8 
    },
    cartDetailsRow:{
        flex:1,
        flexDirection: 'row',
    },
    grandTotal:{
        width: `${98}%`,
        flexDirection:'row',
        padding:8,
    }
})

