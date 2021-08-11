import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function DrawerContent(props) {

  const [notify, setNotify] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={styles.userInfoSection}>
          <Avatar.Text
            label="AF"
            style={{ backgroundColor: "#37C7AD"}}
            color='#fff'
          />
          <Title style={styles.title}>Agro Fresh DL </Title>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={size}
              />
            )}
            label="Home"
            onPress={() => {props.navigation.navigate('Home')}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Account"
            onPress={() => {props.navigation.navigate('Account')}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="truck-delivery-outline" color={color} size={size} />
            )}
            label="My Orders"
            onPress={() => {props.navigation.navigate('MyOrders')}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="information-outline" color={color} size={size} />
            )}
            label="About us"
            onPress={() => {props.navigation.navigate('AboutUs')}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="gift-outline" color={color} size={size} />
            )}
            label="Refer & Earn"
            onPress={() => {props.navigation.navigate('ReferAndEarn')}}
          />
          
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Logout"
            onPress={() => {props.navigation.navigate('Home')}}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {(!notify)? setNotify(true) : setNotify(false)}}>
            <View style={styles.preference}>
              <Text>Notifications</Text>
              <View pointerEvents="none">
                <Switch value={notify} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});