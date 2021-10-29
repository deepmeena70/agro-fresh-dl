import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator} from 'react-native'
import { TextInput } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default function ProductSearchScreen({navigation}) {
    const [text, setText] = useState('');

    const initialArr = [];

    const [searchItems, setSearchItems] = useState(initialArr);
    const [loading, setLoading] = useState(false);

    const [loadingFailed, setLoadingFailed] = useState(false);

    const fetchSearch = async () => {
        setLoading(true)
        setLoadingFailed(false)
        const docRef = firestore().collection("products");

        const searchStr = text.charAt(0).toUpperCase() + text.slice(1);

        const snapshot = await docRef
        .where("productName", "==", searchStr)
        .get()
        .catch((e) => console.log(e));

        if(snapshot.docs.length > 0) {
            setLoadingFailed(false)
        }

        if(snapshot.empty) {
            setLoading(false)
            setLoadingFailed(true)
            return console.log(text,"Product not found in search")
        }

        snapshot.forEach(doc => {
            setSearchItems((oldArray) => [...oldArray, doc.data()] )
        })
        setLoading(false)
    }

    useEffect(() => {
        setSearchItems(initialArr);
        fetchSearch()
    },[text])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TextInput
                    label=""
                    value={text}
                    onChangeText={(text) => {
                        setText(text)
                    }}
                    placeholder="Search product"
                    mode="outlined"
                    style={{ padding:12, height:30 }}
                />
                <View style={styles.cardContent}>
                    <Card>
                        {searchItems.length > 0 &&
                            searchItems.map((item, key )=> {
                                return (    
                                            <TouchableOpacity
                                                onPress={()=> navigation.navigate("ProductDetails", {
                                                    item: item
                                                })} 
                                                key={key} 
                                                style={styles.cardInnerContent}>
                                                <Card.Content>
                                                    <Title>{item.productName}</Title>
                                                    <Paragraph>{item.bulk ? "Bulk Order": "Regular Order"}</Paragraph>
                                                </Card.Content>
                                            </TouchableOpacity>
                                        )
                            }) 
                        }
                   
                    </Card>
                </View>
            </View>
            {
                (loading === true)?
                <ActivityIndicator style={{ marginTop:12 }} size="small" color="#37c4ad" />
                :
                null
            }
            {
                loadingFailed?
                <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ color: "lightgrey", fontSize: 22 }}>Not found</Text>
                </View>
                : null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        marginTop:80
    },
    cardContent: {
        marginLeft:12,
        marginRight:12
    },
    cardInnerContent:{
        padding:12
    }
})
