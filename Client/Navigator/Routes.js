import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import {auth} from '../components/firebase';
import { Authcontext } from './Provider';
import {MainStack, Inb, Pos, Pro, Sel } from './MainStack';
import Tablo from './Tablo'
import Login from '../components/Screens/Login';


const Routes = () => {

 

    // const {user, setUser} = useContext(Authcontext);

    // const [initializing, setInitializing] = useState(true);
    // const onAuthStateChanged = (user) => {
  
    //   setUser(user);
     
    //   if (initializing) setInitializing(false);
  
    // }
    
    // useEffect(() => {
    //   const subscribe = auth.onAuthStateChanged(onAuthStateChanged);
    //   return subscribe;
    // }, []);
    
    // if (initializing) return null;

    return (
      <NavigationContainer>
       
          <Tablo />
        
        
        </NavigationContainer>
    );
}

export default Routes;