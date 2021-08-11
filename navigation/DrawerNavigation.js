import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

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


const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator 
            initialRouteName="Home" 
            screenOptions={{ headerShown:false }}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Account" component={AccountScreen} />
            <Drawer.Screen name="MyOrders" component={MyOrdersScreen} />
            <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
            <Drawer.Screen name="ReferAndEarn" component={ReferAndEarnScreen} />
            <Drawer.Screen name="OrderCategory" component={OrderCategoryScreen} />
            <Drawer.Screen name="FreshBasket" component={FreshBasketScreen} />
            <Drawer.Screen name="Offers" component={OffersScreen} />
            <Drawer.Screen name="Notification" component={NotificationScreen} />
            <Drawer.Screen name="Cart" component={CartScreen} />
            <Drawer.Screen name="Location" component={LocationScreen} />
        </Drawer.Navigator>
    )
}
