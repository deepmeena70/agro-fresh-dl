import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {searchSelector, fetchSearch} from '../features/search'
import { Card, Title, Paragraph } from 'react-native-paper';

export default function ProductSearchScreen({navigation}) {
    const [text, setText] = useState('');

    const {searching, searchItems} = useSelector(searchSelector);

    const dispatch = useDispatch();

    const searchIn = (text) => {
        console.log("searching", searching, searchItems, text);
        dispatch(fetchSearch(text));
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TextInput
                    label=""
                    value={text}
                    onChangeText={(text) => {
                        setText(text)
                        searchIn(text)
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
