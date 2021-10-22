import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VegetablesScreen from '../screens/orderSubCategory/VegetablesScreen';
import FruitsScreen from '../screens/orderSubCategory/FruitsScreen';
import ExoticScreen from '../screens/orderSubCategory/ExoticScreen';

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIndicatorStyle: {backgroundColor: '#37c4ad'},
        tabBarActiveTintColor:'#37c4ad',
        tabBarInactiveTintColor:'grey',
}

export default function TopTabNavigation() {

    return (
            <Tab.Navigator 
            screenOptions={screenOptions}
            >
                <Tab.Screen name="Vegetables"  component={VegetablesScreen} />
                <Tab.Screen name="Fruits" component={FruitsScreen} />
                <Tab.Screen name="Exotic" component={ExoticScreen} />
            </Tab.Navigator>

    )
}
