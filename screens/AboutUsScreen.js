import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

// components
import SecondaryHeader from '../components/SecondaryHeader'

const AboutUsScreen = ({navigation}) => {

    return (
        <View style={ styles.container }>
            <SecondaryHeader navigation={navigation} screenName="About Us"/>
            <View style={styles.contentContainer}>
                <Text style={{ textAlign:'justify' }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eum ea ut quasi pariatur, quos natus nulla facere exercitationem, commodi at nemo expedita blanditiis! Voluptate, repellendus possimus. Voluptatum, repellat consequuntur?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eum ea ut quasi pariatur, quos natus nulla facere exercitationem, commodi at nemo expedita blanditiis! Voluptate, repellendus possimus. Voluptatum, repellat consequuntur?
                </Text>
                <View style={styles.row}>
                    <MaterialCommunityIcons
                        name="email"
                        size={28}
                        color="#37c4ad"
                    />
                    <Text style={styles.rowText}>enquiry@agrofresh.com</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons
                        name="phone"
                        size={28}
                        color="#37c7ad"
                    />
                    <Text style={styles.rowText}>+91 88888 99999</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons
                        name="domain"
                        size={28}
                        color="#37c7ad"
                    />
                    <Text style={styles.rowText}>
                        102, B-Block, Kota, Rajasthan - 324009
                    </Text>
                </View>
                <View style={{ flex:.1, alignItems: 'center'}}>
                    <Text style={{ fontSize:20, color: "#37c7ad", fontStyle: "italic" }}>"lorem ipsum dolor sit amet"</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Copyright &copy; AgroFreshDL Pvt. Ltd.</Text>
            </View>
        </View>
    )
}

export default AboutUsScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    contentContainer:{
        flex:1,
        paddingTop:12,
        paddingLeft:18,
        paddingRight:18
    },
    row:{
        flex:.1,
        flexDirection: 'row',
    },
    rowText:{
        paddingLeft:18 
    },
    footer:{
        flex:.05,
        backgroundColor:"#37c4ad",
    },
    footerText:{
        paddingTop:6,
        textAlign: 'center',
        color:"#fff"
    }
})
