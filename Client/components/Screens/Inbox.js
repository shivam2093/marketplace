import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { Avatar } from 'react-native-paper'


const Inbox = ({ route}) => {

 
   
  

    return (
        <View style={styles.container}>
      
     <Text>Inbox</Text>
    </View>
        )
}

export default Inbox

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#fff',
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
