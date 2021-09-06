import React,{useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import {MainStack, Inb, Pos, Pro, Sel } from './MainStack';
import { AntDesign } from '@expo/vector-icons'
import { Authcontext } from './Provider';
import Login from '../components/Screens/Login';
import * as SecureStore from 'expo-secure-store';


const Tab = createBottomTabNavigator();

const Tablo = () => {


  const {user, setUser} = useContext(Authcontext)
  const{state, dispatch} = useContext(Authcontext)  
//console.log('state from tabl0', user._id)

  //useLayoutEffect(() => {
   
    const getData = async () => {
   
      try {
        var user = await SecureStore.getItemAsync('user')
        var token = await SecureStore.getItemAsync('jwt')
       let sm = JSON.parse(user)
       dispatch({ type: "USER", payload: user })
   //  console.log("this line",token)
      
      setUser(user);
      } catch (e) {

        console.log(e)

      }
      
  }
  
  
  getData();

 //  return () =>  getData();
  
    
  
 // }, [])
  
  
  
  

  // user =JSON.parse(AsyncStorage.getItem("user"))
  // setUser(user)

  // const lmx = async () => {
  //   token = await AsyncStorage.getItem('user');

  // }
 
  // lmx();
    
  // useEffect(() => {
     
  //  const amx =   AsyncStorage.getItem("user")
  
  //   setUser(amx);

 
      
  //   }, []);
    


    return (
        
      <Tab.Navigator  screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
          return <AntDesign name={'home'} size={20} color="black" />
          } else if (route.name === 'Inbox') {
            return <AntDesign name={'message1'} size={20} color="black" />
          } else if (route.name === 'Post') {
            return <AntDesign name={'camera'} size={20} color="black" />
          } else if (route.name === 'Sell') {
           return  <AntDesign name={'mobile1'} size={20} color="black" />
          } else if (route.name === 'Profile') {
            return <AntDesign name={'profile'} size={20} color="black" />
        }}
      })} tabBarOptions = {{activeTintColor: 'tomato',inactiveTintColor:'black'}}>
       
        <Tab.Screen name="Home" component={MainStack} />
        <Tab.Screen name="Inbox" component={user  ? Inb: Login}/>
        <Tab.Screen name="Post"  component={user ? Pos: Login} />
        <Tab.Screen name="Sell" component={user ? Sel: Login} />
        <Tab.Screen name="Profile" component={Pro} />
        
            </Tab.Navigator>
   
    )
}

export default Tablo
