import React,{useContext} from 'react'
import { View, Text } from 'react-native'
import { Authcontext } from '../../Navigator/Provider'
import { Button } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store';

const Settings = ({ navigation }) => {
    const { state, dispatch } = useContext(Authcontext);

    const whenPress = () => {
        console.log("hey", state)
          if (state) {
              SecureStore.deleteItemAsync('user')
              dispatch({ type: "CLEAR"})
              navigation.navigate('Home')
          }
      }
    return (
        <View>
           <Button onPress={whenPress}>LogOut</Button>
        </View>
    )
}

export default Settings
