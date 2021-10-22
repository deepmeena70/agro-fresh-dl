import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VegetablesBulkScreen from '../screens/orderSubCategory/VegetablesBulkScreen';
import FruitsBulkScreen from '../screens/orderSubCategory/FruitsBulkScreen';
import ExoticBulkScreen from '../screens/orderSubCategory/ExoticBulkScreen';

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIndicatorStyle: {backgroundColor: '#37c4ad'},
        tabBarActiveTintColor:'#37c4ad',
        tabBarInactiveTintColor:'grey',
}

export default function TopTabNavigationBulk() {

    return (
        <Tab.Navigator 
        screenOptions={screenOptions}
        >
            <Tab.Screen name="VegetablesBulk"  component={VegetablesBulkScreen} />
            <Tab.Screen name="FruitsBulk" component={FruitsBulkScreen}  />
            <Tab.Screen name="ExoticBulk" component={ExoticBulkScreen}  />
        </Tab.Navigator>
           
    )
}
