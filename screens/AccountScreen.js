import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Avatar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function AccountScreen({navigation}) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container1}>
                <View style={{ flex:1, flexDirection: 'row'}}>
                    <MaterialCommunityIcons 
                        name="arrow-left"
                        size={28}
                        color="#fff"
                        style={{ marginLeft:12 }}
                        onPress={()=> navigation.navigate('Home')}
                    />
                    <Text style={{ color:"#fff", paddingLeft:12, paddingTop: 2, fontSize:18 }}>My Account</Text>
                </View>
                <View style={{ flex:3, alignItems: 'center'}}>
                    <Avatar.Text 
                        size={80}
                        label="AF"
                        color="#37c7ad"
                        style={{ backgroundColor:"#fff",marginTop:0 }}
                    />
                    <Text style={styles.container1Text}>Agro FreshDL</Text>
                    <View style={styles.container1Row}>
                        <Text style={styles.container1RowText}>Edit</Text>
                        <MaterialCommunityIcons 
                            name="pencil"
                            size={22}
                            color="#fff"
                            style={{ marginLeft:3 }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.row}>
                    <MaterialCommunityIcons 
                        name="account"
                        size={28}
                        color="grey"
                    />
                    <Text style={styles.rowText}>Agro FreshDL</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons 
                        name="cellphone"
                        size={28}
                        color="grey"
                    />
                    <Text style={styles.rowText}>8888899999</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons 
                        name="email"
                        size={28}
                        color="grey"
                    />
                    <Text style={styles.rowText}>agrofreshdl@xyz.com</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons 
                        name="lock"
                        size={28}
                        color="grey"
                    />
                    <Text style={styles.rowText}>*********</Text>
                </View>
                <View style={styles.rowAddress}>
                    <MaterialCommunityIcons 
                        name="map-marker"
                        size={28}
                        color="grey"
                    />
                    <Text style={styles.rowText}>123, Block, Kota, Rajasthan - 324002 </Text>
                    <Text style={{ color:"#37c7ad", marginLeft:6, paddingTop:4, flexGrow:4 }}>Change Primary</Text>
                </View>
            </View>
            <Button 
                    onPress={() => {}}
                    title="Add More Address"
                    color="#37c7ad"
                />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    container1:{
        flex:.3,
        backgroundColor:'#37C7AD',
        paddingTop:40
    },
    container1Text:{
        color:'#fff',
        fontSize:24,
        marginTop:12,
    },
    container2:{
        flex:.7,
        paddingRight:100
    },
    container1Row:{
        flex:1,
        flexDirection:'row',
        marginTop:6

    },
    container1RowText:{
        color:"#fff",
        fontSize:16,
        textDecorationLine:'underline',
        marginLeft:12
    },
    row:{
        flex:.07,
        flexDirection:'row',
        marginLeft:12,
        marginTop:24
    },
    rowAddress:{
        flex:.7, 
        flexDirection: 'row',
        marginLeft:12,
        marginTop:24,
        justifyContent: 'flex-start',
        paddingRight:50

    },
    rowText:{
        marginLeft:12,
        paddingTop:5,
        flexGrow:1
    }
})
