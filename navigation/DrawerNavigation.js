import React, {useEffect, useState} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux'
import {fetchUser,clearUser, userSelector} from '../features/user'
import {userDataSelector, fetchUserData} from '../features/userData'

// component
import DrawerContent from '../components/DrawerContent'

// screens
import HomeScreen from '../screens/HomeScreen'
import AboutUsScreen from '../screens/AboutUsScreen'
import MyOrdersScreen from '../screens/MyOrdersScreen'
import ReferAndEarnScreen from '../screens/ReferAndEarnScreen'
import AccountScreen from '../screens/AccountScreen'
import OrderCategoryScreen from '../screens/OrderCategoryScreen'
import FreshBasketScreen from '../screens/FreshBasketScreen'
import OffersScreen from '../screens/OffersScreen'
import NotificationScreen from '../screens/NotificationScreen'
import CartScreen from '../screens/CartScreen'
import LocationScreen from '../screens/LocationScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import RegistrationScreen from '../screens/auth/RegistrationScreen'
import AddDeliveryAddress from '../screens/AddDeliveryAddress'
import OrderSummary from '../screens/OrderSummary';
import PaymentOptions from '../screens/PaymentOptions'
import UpiOptions from '../screens/UpiOptions'

// components
import Loading from '../components/Loading'
import Errors from '../components/Errors'


const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {

    const dispatch = useDispatch()
    const {user,loading, hasErrors, signIn} = useSelector(userSelector)
    const {userData, userDataLoading, hasUserDataErrors} = useSelector(userDataSelector)
 
    useEffect(() => {
        dispatch(fetchUser())
        dispatch(fetchUserData(user))
    } , [dispatch, user])
    

    
    console.log('user =>', user)
    console.log('userData =>', userData)
    console.log('signIn =>',signIn)

    

    if(loading) {
        return  <Loading />
    }

    if(hasErrors) {
        return   <Errors />
    }

    return (
        <Drawer.Navigator 
            initialRouteName="Home" 
            screenOptions={{ headerShown:false }}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
            <Drawer.Screen name="OrderCategory" component={OrderCategoryScreen} />
            <Drawer.Screen name="FreshBasket" component={FreshBasketScreen} />
            {signIn ? 
                 <>
                    <Drawer.Screen name="MyOrders" component={MyOrdersScreen} />
                    <Drawer.Screen name="Account" component={AccountScreen} />
                    <Drawer.Screen name="ReferAndEarn" component={ReferAndEarnScreen} />
                    <Drawer.Screen name="Offers" component={OffersScreen} />
                    <Drawer.Screen name="Notification" component={NotificationScreen} />
                    <Drawer.Screen name="Cart" component={CartScreen} />
                    <Drawer.Screen name="AddDeliveryAddress" component={AddDeliveryAddress} />
                    <Drawer.Screen name="OrderSummary" component={OrderSummary} />
                    <Drawer.Screen name="Location" component={LocationScreen} />
                    <Drawer.Screen name="PaymentOptions" component={PaymentOptions} />
                    <Drawer.Screen name="UpiOptions" component={UpiOptions} />
                </>
            :
                <>
                    <Drawer.Screen name="Login" component={LoginScreen} />
                    <Drawer.Screen name="Register" component={RegistrationScreen} />
                </>
            }

         
        </Drawer.Navigator>
    )
}
