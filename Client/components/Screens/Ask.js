import React, { useEffect, useState, useContext, useRef} from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { Avatar } from 'react-native-paper'
import { ScrollView} from 'react-native-gesture-handler';
import io from 'socket.io-client'
import {  Button } from 'react-native-paper';
import * as SecureStore from'expo-secure-store'
import { Authcontext } from '../../Navigator/Provider';


const Ask = ({navigation, route}) => {

     const {user, setUser} = useContext(Authcontext)

 const socket = useRef();
 const messageRef = useRef();

  const change = JSON.parse(user)

const id = change.id 
//  const chatRoom = route.params._id;
const[messages, setMessages] = useState([])
const[messageToSend, setMessageToSend] = useState('')


    useEffect(() => {
   
   getData();

    // socket.current.on("newMessage",({message, userId, name }) => {
    //     setMessages(...messages, message)
    
    // })
    //  return () => {
    //     if(socket){
    //     socket.emit("leaveRoom", {
    //         id
    //     })
    // }
    // }


    }, [])


    const getData =  async() =>{
 
        socket.current = io("http://192.168.27.238:3001",{
            query:{
                token : await SecureStore.getItemAsync('jwt') 
            }
    
        })
    }

   const textOfRecvMessage = messages.map(msg =>{
       <Text key={msg}>{msg.name}</Text>
   })

const sendMessage = () => {
   
        socket.current.emit("chat", {
            id,
            message: messageToSend
        })
 setMessageToSend("")   
}

     
    return (
        
        <View style={styles.container}>
            {textOfRecvMessage}

            {/* {
               messages.map(message => (
             <View key = {id}>
                <Text>{message.name}:</Text><Text>{message.message}</Text>
                   </View>
               )) 
            } */}


     <TextInput 
      value = {messageToSend}
    // ref={messageRef}
     onChangeText={text => setMessageToSend(text)}
     placeholder = "enter chat"
     onSubmitEditing={sendMessage}
     />
            {/* <View style={styles.top}>
            <Avatar.Image source={{uri: `${data.postedby?.img}`}} />
            <Text style={{fontSize: 18, color:'black'}}>{data.postedby?.name}</Text>
            <Image source={{uri: `${data.img}`}} style={{width:70, height:70, borderRadius:6}} />
            </View>
           */}
            
        </View>
    )
}




export default Ask

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#f5f5dc',
        flex:1
    },

    top:{
            flexDirection: 'row',
            justifyContent:'space-between',
            marginTop:10
           
    },
    second:{
        marginTop:20
        ,marginLeft:5
    }

})