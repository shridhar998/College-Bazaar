/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {  DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CreateAdScreen from './screens/CreateAdScreen'
import HomeScreen from './screens/ListItemScreen'
import AccountScreen from './screens/AccountScreen'
import auth from '@react-native-firebase/auth';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
  },
};

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const AuthNavigator= () => {
   return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}
        >
             <Stack.Screen name="login" component={LoginScreen}/>
             <Stack.Screen name="signup" component={SignupScreen}/>
        </Stack.Navigator>
   )
}
const TabNavigator = () => {
    return (
           <Tab.Navigator
           screenOptions={
           {
             "tabBarActiveTintColor": "deepskyblue",
             "tabBarInactiveTintColor": "gray",
             "tabBarStyle": [
               {
                 "display": "flex"
               },
               null
             ]
           },
           ({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home'

              } else if(route.name==='create'){
                iconName = 'plus-circle'
              }else if (route.name==='account'){
                iconName = "user"
              }


              return <View style={{borderWidth:1,borderColor:"white",borderRadius:30}}><Feather name={iconName} size={35} color={color} /></View>
            },

          })

          }
           >

            <Tab.Screen name="Home" component={HomeScreen} options={{title:"Items for sale"}}/>
            <Tab.Screen name="create" component={CreateAdScreen}  options={{title:"Post your ad"}} />
            <Tab.Screen name="account" component={AccountScreen}  options={{title:"My Account"}} />

          </Tab.Navigator>
    )
}

const Navigation=()=>{
const [user,setUser]=useState('');

    useEffect(()=>{
        auth().onAuthStateChanged((userExist)=>{
            if(userExist){
                setUser(userExist);
            }
            else{
                setUser('');
            }
        })
    },[])
return(
    <NavigationContainer>
        {user?<TabNavigator/>:<AuthNavigator/>}
    </NavigationContainer>
)
}
const App: () => Node = () => {

  return (
        <>
           <PaperProvider theme={theme}>
              <StatusBar barStyle="dark-content" backgroundColor="deepskyblue"/>
             <View style={styles.container}>
              <Navigation />
             </View>
           </PaperProvider>
        </>
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:"#fff",
   }
});

export default App;
