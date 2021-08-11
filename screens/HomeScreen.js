import React from 'react'
import {View, Text, StyleSheet, Image, Pressable} from 'react-native'

// components
import PrimaryHeader from '../components/PrimaryHeader'

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <PrimaryHeader navigation={navigation} />
            <View style={styles.homeContainer}>
                <Image 
                source={require('../assets/banner.png')}
                style={styles.image}
                />
                <View style={styles.itemContainer}>
                    <View style={styles.row}>
                    <Pressable
                        styles={{ flex:1 }}
                        onPress={() => {navigation.navigate('OrderCategory')}}
                    >
                        <View style={styles.items}>
                        <Image
                            source={require('../assets/regular.png')}
                            style={styles.itemsImage}
                        ></Image>
                        <Text style={styles.itemsText}>Regular Order</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        styles={{ flex:1 }}
                        onPress={() => navigation.navigate('OrderCategory')}
                    >
                        <View style={styles.items}>
                        <Image
                            source={require('../assets/bulk.png')}
                            style={styles.itemsImage}
                        ></Image>
                        <Text style={styles.itemsText}>Bulk Order</Text>
                        </View>
                    </Pressable>
                    </View>
                    <View style={styles.row}>
                    <Pressable
                        style={{ flex:1 }}
                        onPress={() => navigation.navigate('FreshBasket')}
                    >
                        <View style={styles.items}>
                        <Image
                            source={require('../assets/basket.png')}
                            style={styles.itemsImage}
                        ></Image>
                        <Text style={styles.itemsText}>Fresh Basket</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={{ flex:1 }}
                        onPress={() => navigation.navigate('Offers')}
                    >
                        <View style={styles.items}>
                        <Image
                            source={require('../assets/offer.png')}
                            style={styles.itemsImage}
                        ></Image>
                        <Text style={styles.itemsText}>Offers</Text>
                        </View>
                    </Pressable>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    homeContainer:{
        flex:1,
        alignItems:'center',
      },
      image:{
        marginTop:24,
        flex:.4,
        width:390
      },
      itemContainer:{
        flex:.6,
      },
      row:{
        flex:.45,
        flexDirection:'row',
        marginTop:36,
      },
      items:{
        marginLeft:16.5,
        marginRight:12,
        alignItems:'center',
        justifyContent:'center',
        height:134,
        width:"80%",
        backgroundColor:"white",
        borderRadius:10,
        padding:18,
        elevation:4,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
      },
      itemsImage:{
        width:60,
        height:60,
      },
      itemsText:{
        fontSize: 16,
        paddingTop:12,
        color:'grey',
        width:100,
        textAlign:'center'
      }
})
