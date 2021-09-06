
import { IconButton, Colors } from 'react-native-paper'
import React,{useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image,FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { Authcontext } from '../../Navigator/Provider'
import * as SecureStore from'expo-secure-store'
import { Button } from 'react-native-paper'
import {AntDesign} from '@expo/vector-icons'
import { sub } from 'react-native-reanimated'



const Sell = ({navigation}) => {
    
    const [mypics, setPics] = useState([]);
    const[refresh, setRefresh] = useState(false);

        
   // const { state, dispatch } = useContext(Authcontext);

    //const [state, dispatch] = useReducer(reducer, initialState);

    
    useEffect(() => {
        sub()
    }, [])

    const sub = async () => {
    setRefresh(true)
        const token = await SecureStore.getItemAsync("jwt")

        fetch('http://192.168.0.43:3000/detail/mypost', {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            res.json().then(result => {
            console.log("check here", result)
                setPics(result.mypost)
            })
        })
        setRefresh(false)
    }

 //   mypics.map(item => console.log('check Beta',item))


    const deletePost = async (postId) => {
        const token = await SecureStore.getItemAsync("jwt")
        fetch(`http://192.168.0.43:3000/detail/deletepost/${postId}`, {
            method: "delete",
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        })
        
        .then((res) => {

            res.json().then((resp) => {
               // console.log(resp)
                sub()
            })

        //     setPics(mypics.filter((val) => {
    
        //  temp =  val.postId !== postId
        
            
      // })  )
    })
        //     .then(result => {
        //     console.log(result)
        // })
    }

    const date = SecureStore.getItemAsync('date');
    const contact = date && new Date(parseInt(date));
    const now = new Date();
    const dataAge = Math.round((now - contact) / (1000 * 60));
    
    return (
        
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl  refreshing={refresh}
            
             onRefresh={sub}
            />
        } >
        <View >

            <Button mode="contained" style={{ width: 150, margin: 10 }} onPress={() => navigation.navigate('Post') }>Post an Item</Button>
               
                <View style={styles.lineStyle} />
            {
                mypics.map(item => {
                    return (
                       
                        <View key={item._id} style={styles.map} >
                           <TouchableOpacity>
                            <Image key={item._id} source={{ uri: `${item.img}` }} style={{
                                width: 120,
                                height: 120,
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: 'black'
                                }} />
                                </TouchableOpacity>
                            <Text style={{ fontSize: 20,color:'orange' }}>Item:&nbsp;{item.title}</Text>
                  
                            {
                                //console.log("item id: ", typeof item.postedby._id +" and state id",state._id +","),
                              
                                item.postedby._id &&

                                   // <Button  onPress={() => deletePost(item._id)}>Delete post </Button> 
                                    
                               <AntDesign name="delete" size={20} color="purple" onPress={() =>  deletePost(item._id)} />  
                            }
                            
                           
                               
                           
                            
                            
                        </View>
                            
                    )
                })
                      
                        
                            
            }
            </View>
            </ScrollView>
                
    )
       
        
}

export default Sell

const styles = StyleSheet.create({
    container: {
       
        flex: 1,
        backgroundColor: '#fff8dc'
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor:'black',
        margin: 10,
        width: '90%',
        
    },
    map: {
        
        flexDirection: 'row',
        margin: 10,
        justifyContent:'space-between'
    },
    button:{
width:50
    }
})
