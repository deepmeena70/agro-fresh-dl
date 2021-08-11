import React from 'react';
import { View, StyleSheet} from 'react-native';
// component
import PrimaryHeader from '../components/PrimaryHeader'
// navigation
import TopTabNavigation from '../navigation/TopTabNavigation';

export default function OrderCategoryScreen({navigation}) {

    return (
        <View style={styles.Container}>
            <PrimaryHeader navigation={navigation}/>
            <View style={styles.tabBarContainer}>
                <TopTabNavigation />
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


