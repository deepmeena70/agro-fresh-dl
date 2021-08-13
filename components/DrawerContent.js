import React, {useState, useEffect} from 'react';
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
import { useSelector, useDispatch} from 'react-redux'
import { userSelector, clearUser } from '../features/user'
import {userDataSelector, fetchUserData} from '../features/userData'


export default function DrawerContent(props) {

  const dispatch = useDispatch();

  const [notify, setNotify] = useState(false);
  const {user, signIn} = useSelector(userSelector)
  const {userData, userDataLoading, hasUserDataErrors} = useSelector(userDataSelector)
  const {navigation} = props;
  

  // console.log("user =>",user)
  // console.log("userData =>", userData)

  const userName = () => {
    if(userData) {
      const name = String(userData.name);
      const nameArray = name.split('');
      return nameArray[0];
    }
    return '...';
  }

  const onLogout = () => {
    dispatch(clearUser());
    navigation.navigate('Home')
  }

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        
        <View style={styles.userInfoSection}>
          <Avatar.Text
            label={!user ? 'G' : userName()}
            style={{ backgroundColor: "#37C7AD"}}
            color='#fff'
          />
          <Title style={styles.title}>
            {!user && 'Guest'}
            {user && (!userData ? '...' : userData.name)}
          </Title>
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
            onPress={() => {navigation.navigate('Home')}}
          />
          {user && 
             <>
                <DrawerItem
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account-outline"
                        color={color}
                        size={size}
                      />
                    )}
                    label="Account"
                    onPress={() => {navigation.navigate('Account')}}
                  />
              
            
                <DrawerItem
                  icon={({ color, size }) => (
                    <MaterialCommunityIcons name="truck-delivery-outline" color={color} size={size} />
                  )}
                  label="My Orders"
                  onPress={() => {navigation.navigate('MyOrders')}}
                />
             </>
          }
      
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="information-outline" color={color} size={size} />
            )}
            label="About us"
            onPress={() => {navigation.navigate('AboutUs')}}
          />
          {user && 
            <>
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons name="gift-outline" color={color} size={size} />
                )}
                label="Refer & Earn"
                onPress={() => {navigation.navigate('ReferAndEarn')}}
              />
            
          
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons name="logout" color={color} size={size} />
                )}
                label="Logout"
                onPress={() => onLogout()}
              />
            </>
          }
          {!user &&
              <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="login" color={color} size={size} />
              )}
              label="Login"
              onPress={() => {navigation.navigate('Login')}}
            />
           
          }
 
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple 
            onPress={() => {(!notify)? setNotify(true) : setNotify(false)}}
            >
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