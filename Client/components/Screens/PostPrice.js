import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Button} from 'react-native'
import { Authcontext } from '../../Navigator/Provider'
//import AsyncStorage from '@react-native-community/async-storage'
import { ToastAndroid } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { handleUpload } from './Post'
import { sub } from 'react-native-reanimated';

const PostPrice = ({ navigation }) => {
   
    const { img, setImg } = useContext(Authcontext);
    const { title, setTitle } = useContext(Authcontext);
    const { category, setCategory } = useContext(Authcontext);
    const {condition, setCondition } = useContext(Authcontext);
    const {description, setDescription } = useContext(Authcontext);
    const { price, setPrice } = useContext(Authcontext);
    const { url, setUrl } = useContext(Authcontext);

    
  //  useEffect(() => {
        
        const sub = async () => {

            if (url && price) {
                const token = await SecureStore.getItemAsync("jwt")
            
                fetch('http://192.168.0.43:3000/detail', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token 
                    },
                    body: JSON.stringify({
                         pic: url,
                        "title": title,
                        "category": category,
                        "condition": condition,
                        "description": description,
                        "price":  price,
                    })
                }).then((res) => {
                    res.json().then( data => {
                        if (data.error) {
                            //console.log(data.error)
                            ToastAndroid.show(data.error, 10)
                        }
                        else {
                         //   SecureStore.setItemAsync('date', Date.now());
                            ToastAndroid.show('success', 10)
                    
                           navigation.popToTop('Home')
                   
                        }
                    })
                })
            }
        }

    //   return () => 
   // sub();
    
        
  //  }, [url])
    


    const submitData =  () => {

         const data = new FormData()
            data.append('file', img)
            data.append('upload_preset', 'react-native-app')
            data.append("cloud_name", 'shivam2k7')
            fetch("https://api.cloudinary.com/v1_1/shivam2k7/image/upload", {
                method: 'POST',
                body: data
            }).then(res => res.json())
                .then(data => {
  console.log(data)
                    setUrl(data.url)
                    
                })
                .catch(err => {
            console.log(err)
        })
             
    
    }


    return (
        <View style={styles.main}>
            <Text style={{color:'green', left:350, marginTop:10}}  onPress={ () => navigation.navigate('Home')}>Cancel </Text>
            <View style={styles.price}> 
           <TextInput value={price} onChangeText={value => setPrice(value)} style={{ width:150,fontSize:30, height:50,borderWidth:1, borderRadius:3, textAlign:'center'}} placeholder="$0"/>
            </View>
           <View style={styles.button}>
                <Button color='green' title="Submit" onPress={sub}/>
           </View>
            </View>
    )
}

export default PostPrice


const styles = StyleSheet.create({
    main: {
    
},
    price: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        padding: 5,
        marginTop:10
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor:'black',
        margin: 70,
        width: '70%',
        
    },
    button: {
        marginTop: 460,
        
    }

})