
import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, View, ToastAndroid, FlatList, Image } from 'react-native'
//import {} from 'react-native-elements'
import { Authcontext } from '../../Navigator/Provider'
//import AsyncStorage from '@react-native-community/async-storage'
import * as SecureStore from 'expo-secure-store';
import {  Button, IconButton, Text } from 'react-native-paper';
import { Avatar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';

const Profile = ({navigation}) => {

    
   // const { mydata, setMyData } = useContext(Authcontext);
    const {user, setUser} = useContext(Authcontext)
    
    const { state, dispatch } = useContext(Authcontext);

    let inObject = JSON.parse(user)

    // useEffect(() => {
    //         mydata
            
    // },[mydata])

  // console.log('where',  state)
    
  
    return (
        <ScrollView contentContainerStyle={styles.container} >
            <View style={styles.pic}>
            <Avatar  onPress={() => navigation.navigate('Register')} title="NO PIC" rounded source={ user ? {  uri:`${inObject.img}`} : ''} size="xlarge" containerStyle={{right:89, borderColor:'black',borderStyle:'dashed', borderWidth:2}} />
            <Text style={{ fontSize: 20, right: 85 }}>{user ? inObject.name : ''}</Text>
            </View>
           
            <IconButton icon="settings-helper" style={{ bottom: 230, left:170  }} size={43} onPress={() => navigation.navigate('LogOut')} />

        
            <Text style={{ fontSize: 20, marginRight: '65%' }}>Transactions</Text>
  
            <Button  style={{marginRight:'60%'}}>Purchase & sales</Button>
            <View style={styles.lineStyle} />
            <Button  style={{marginRight:'75%'}}>Payments</Button>
            <Text style={{fontSize:20, marginRight:'80%'}}>Saves</Text>
            <Button  style={{marginRight:'70%'}}>Saved items</Button>
            <Text style={{fontSize:20, marginRight:'75%', marginTop:5}}>Account</Text>
            <Button  style={{marginRight:'60%'}}>Account settings</Button>
            <View style={styles.lineStyle} />
            <Button  style={{marginRight:'60%'}}>Public profile</Button>
            <View style={styles.lineStyle} />
            <Button  style={{marginRight:'50%'}}>Custom profile link</Button>
            <Text style={{ fontSize: 20, marginRight: '79%' }}>Help</Text>
            <Button  style={{marginRight:'70%'}}>Help Center</Button>
        
        </ScrollView>
    )
    
}

export default Profile

const styles = StyleSheet.create({

    container: {
      
        alignItems: 'center',
        backgroundColor:'#fff8dc'
        
    },
   
    
    button: {
        width: 200,
        marginTop: 10
    },
    pic: {
        flexDirection: 'row',
        margin:17,

        backgroundColor:'#fff8dc'
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor:'black',
        margin: 10,
        width: '90%',
        
    },
})
