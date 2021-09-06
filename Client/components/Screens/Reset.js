import React, { useContext} from 'react'
import {  StyleSheet, View, Text, ToastAndroid} from 'react-native';

import { Authcontext } from '../../Navigator/Provider';

import { Input } from 'react-native-elements'
import { Button } from 'react-native-paper';

const Reset = ({navigation}) => {

    const { email, setEmail } = useContext(Authcontext);

    const login = () => {

        fetch('http://192.168.137.183:3000/users/reset-pass', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
               
            })
        }).then(res => res.json())
            .then( data => {
             //  console.log("check match",data.token)
              // const puthere = data.token
                if (data.error) {
                    ToastAndroid.show(data.error, ToastAndroid.CENTER);
                } else {
                    console.log("here reset", data.token)
                 //  console.log(" check match",data.user)
                //    await  SecureStore.setItemAsync('jwt',puthere)
                //    await SecureStore.setItemAsync('user', JSON.stringify(data.user))
                //   //await  AsyncStorage.setItem('jwt', data.token)
                //   // await AsyncStorage.setItem('user',JSON.stringify(data.user))
                //    dispatch({type:"USER",payload: data.user})
                   ToastAndroid.show(`Hello ${JSON.stringify(data.message)}`, ToastAndroid.BOTTOM);
                  navigation.navigate('Newpass',{data});  
                }
            
            }).catch(err => console.log(err))
    
}

const handleAuth = () => {
    navigation.navigate('Home');
 
 }

    return (
        <View style={styles.container}>
     
          <Input
          placeholder="Email"
          autoFocus type="email"
                 value={email}
                 style={{color:'pink', marginTop:"20%"}}
          onChangeText={(text) => setEmail(text)}
          />
          
      
          <Button style={styles.button} mode="contained" onPress={() => login()}>Reset</Button>

            </View>

    )
}

export default Reset

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#00008b',
        alignItems: "center",
        justifyContent: 'flex-start',
        padding: 10,
    
    },
    header: {
        flexDirection: 'row',
        alignItems:'center'

    },
    headerIn1: {
        flex:1,
     
        alignItems: 'center'
    },
    inputContainer: {
        width:300
    },
    button: {
        width: 200,
        marginTop: 10,
    }


})
