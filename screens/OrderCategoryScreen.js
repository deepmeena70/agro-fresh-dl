import React from 'react';
import { View, StyleSheet} from 'react-native';
// component
import PrimaryHeader from '../components/PrimaryHeader'
// navigation
import TopTabNavigation from '../navigation/TopTabNavigation';
import TopTabNavigationBulk from '../navigation/TopTabNavigationBulk';

export default function OrderCategoryScreen({route, navigation}) {

    return (
        <View style={styles.Container}>
            <PrimaryHeader navigation={navigation}/>
            <View style={styles.tabBarContainer}>
                {route.params !== 'bulk'?
                    <TopTabNavigation/>
                    :
                    <TopTabNavigationBulk route={route}/>

                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex:1
    },
    tabBarContainer:{
        flex:1,
        marginTop:14
    }
    
}) 


