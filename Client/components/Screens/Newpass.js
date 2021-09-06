import React,{useContext, useEffect, useState} from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-paper'
import { Authcontext } from '../../Navigator/Provider';

const Newpass = ({route,navigation}) => {

    const { password, setPassword } = useContext(Authcontext);
    const [mydata, setData] = useState([]); 
   
    
useEffect( ()=>{

    const{data} = route.params;
    setData(data);

},[])

const token = mydata.token
console.log("on ---new pass",typeof password)
    

    const login = () => {

        fetch('http://192.168.0.43:3000/users/new-pass', {
            method: "POST",
            headers: 
            {

                'Content-Type': 'application/json'
            
            },
            body: JSON.stringify({
                "password": password,
                  token : token
            })
        }).then(res => res.json())
            .then( data => {
           
                if (data.error) {
                    ToastAndroid.show(data.error, ToastAndroid.CENTER);
                } else {
                 
                   ToastAndroid.show(`Hello ${JSON.stringify(data.message)}`, ToastAndroid.BOTTOM);
                   navigation.goBack('Login')
                }
            
            }).catch(err => console.log("errorrrr",err))
    
}

    return (
        <View>

            <Input  
             placeholder="Enter a new password"
             secureTextEntry type="password"
             
                    value={password}
                    style={{color:'pink'}}
             onChangeText={(text) => setPassword(text)}
            />
            <Button mode="contained" onPress={() => login()}>Update Password</Button>
            
        </View>
    )
}

export default Newpass
