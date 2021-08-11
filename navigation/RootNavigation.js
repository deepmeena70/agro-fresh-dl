import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation'

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    )
}
