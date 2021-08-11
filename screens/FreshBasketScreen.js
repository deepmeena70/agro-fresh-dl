import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
// component
import PrimaryHeader from '../components/PrimaryHeader'

export default function FreshBasketScreen({navigation}) {

    return (
        <View style={styles.container}>
            <PrimaryHeader navigate={navigation}/>
            <ScrollView style={ styles.mainProductContainer }>
                <View style={styles.card}>
                    <View style={styles.productContainer}>
                        <Image 
                            source={{ uri:'https://images.unsplash.com/photo-1577028300036-aa112c18d109?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' }}
                            style={ styles.thumbnail }
                        />
                        <View style={styles.productDescription}>
                            <Text style={ styles.prodTitle }>Fresh Basket</Text>
                            <View style={ styles.priceContainer }>
                                <Text style={ styles.rate }>₹ 170/unit</Text>
                            </View>
                            <View style={ styles.basketContent }>
                              <Text style={ styles.basketContentText}>Peas+Tomato+Dhaniya+Potato+Ginger+Chilli</Text>
                            </View>
                        </View>
                        <Button 
                        mode="contained" 
                        onPress={() => console.log('Pressed')}
                        color="#37c7ad"
                        labelStyle={{ color:"#fff" }}
                        >
                            Buy
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    mainProductContainer:{
        flex:1,
        paddingLeft:24,
        paddingRight:12
    },
    productContainer:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    card:{
        marginTop:12,
        height:120,
        width:"98%",
        backgroundColor:"white",
        borderRadius:1,
        padding:8,
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
        flex:.95, 
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
        color: "#37c7ad" 
    },
    discountRate:{
        color:"#37c7ad", 
        paddingLeft:12, 
        fontSize:12
    },
    basketContent:{
        flex:1, 
        borderColor:"lightgrey", 
        width:140, 
        marginTop: 6,
    },
    basketContentText:{
        fontSize: 11
    },

}) 

