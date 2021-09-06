import React, { useContext } from 'react'
import { StyleSheet} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../components/Screens/Home';
import Inbox from '../components/Screens/Inbox';
import  Post  from '../components/Screens/Post';
import Sell from '../components/Screens/Sell';
import Profile from '../components/Screens/Profile';
import Register from '../components/Screens/Register';
import Location from '../components/Screens/Location';
import Login from '../components/Screens/Login';
// import { auth } from '../components/firebase';
import Tablo from './Tablo'
import PostInfo from '../components/Screens/PostInfo';
import { Button, Icon } from 'react-native-elements'
import PostPrice from '../components/Screens/PostPrice';
import PostDelivery from '../components/Screens/PostDelivery';
import Newpass from '../components/Screens/Newpass';

import Settings from '../components/Screens/Settings';
import HomeDetail from '../components/Screens/HomeDetail';
import Ask from '../components/Screens/Ask';
import Reset  from '../components/Screens/Reset';


const Stack = createStackNavigator();



const globalScreenOptions = {
    headerStyle: { backgroundColor: "orange" },
    headerTitleStyle: { color: 'black' },
    headerTintColor: 'white',
     
}
const profileOptions = {
    headerStyle: { backgroundColor: "orange" },
    headerTitleStyle: { color: 'black' },
    headerTintColor: 'white' 
}
const postOptions = {
  headerStyle: { backgroundColor: "#00008b" },
  headerTitleStyle: { color: '#f0e68c' },
  headerTintColor: 'black' 
}



const MainStack = () => {


    return (
        <Stack.Navigator screenOptions={globalScreenOptions }>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Register" component={Register} /> 
        <Stack.Screen name="HomeDetail" component={HomeDetail}/>
        <Stack.Screen name = "Ask" component={Ask}/>
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name = "Reset" component = {Reset}/>
        <Stack.Screen name = "Newpass" component = {Newpass}/>
      </Stack.Navigator> 
    )
}

// const Log = () => {

//   return (
//     <Stack.Navigator screenOptions={globalScreenOptions }>
//     <Stack.Screen name = "Login" component = {Login}/>
//     <Stack.Screen name = "Reset" component = {Reset}/>
//     </Stack.Navigator>
//  )

// }
// const Res = () => {

//   return (
//     <Stack.Navigator screenOptions={globalScreenOptions }>
//     <Stack.Screen name = "Reset" component = {Reset}/>
    
//     </Stack.Navigator>
//  )

// }


const Inb = () => {

  return(  <Stack.Navigator screenOptions={globalScreenOptions}> 
    <Stack.Screen name="Inbox" component={Inbox} />

    </Stack.Navigator>
  )
}

const Pos = () => {

  return(  <Stack.Navigator screenOptions={postOptions}>
    <Stack.Screen name="Post" component={Post} />
    <Stack.Screen name="PostInfo" component={PostInfo} />
    <Stack.Screen name="PostPrice" component={PostPrice} />
    <Stack.Screen name="PostDelivery" component={PostDelivery} />
    
    
    </Stack.Navigator>
  )
}

const Sel = () => {

   return( 
   <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen name="Sell" component={Sell} /> 
    </Stack.Navigator>)
    
}
const Pro = () => {

  return( 
     <Stack.Navigator screenOptions={profileOptions}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="LogOut" component={Settings}/>
    {/* <Stack.Screen name="Register" component={Register} /> */}
    {/* <Stack.Screen name = "Reset" component = {Reset}/> */}
   
  </Stack.Navigator>)
}



export {MainStack, Inb, Sel, Pro, Pos};

const styles = StyleSheet.create({

})
