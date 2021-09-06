import React,{useState,useEffect, Component, useContext} from 'react'
import { StyleSheet,ToastAndroid, Text, View,TouchableOpacity, Image, FlatList } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'; 
import {SearchBar} from 'react-native-elements'

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { Authcontext } from '../../Navigator/Provider';
import { RefreshControl } from 'react-native';
import { Link } from '@react-navigation/native';
import myip from '../../Network/network'

 const Home = ({navigation}) =>  {

  
 // const [data, setData] = useState({})
  
  const { data, setData } = useContext(Authcontext)
   const [search, setSearch] = useState('')
   const [filter, setFilter] = useState('')
  const [refreshing, setRefreshing] = useState(false);
 
   useEffect(() => {
    
    submitData();
    
  },[submitData])


  const submitData = async () => {
    setRefreshing(true)
      
    const token = await SecureStore.getItemAsync("jwt")
    
   await fetch('http://192.168.0.43:3000/detail',
    {
        headers: {
            'Authorization': 'Bearer ' , token 
        }
    },
    ).then(res => res.json())
        .then(im => {    
            if (im.error) {
                ToastAndroid.show(im.error,10)
            } else
     //console.log('here',  im.docs)
              // setData(im.docs)
              setData(im.docs)
             setFilter(im.docs)
    })
    setRefreshing(false)
  }




   const fetches = (query) => { 
 // const mydata =   data.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).map((element, index) => {
      
      if(query) {
     const newData = data.filter((item) =>{
       const itemData = item.title || item.category ?
       item.title.toUpperCase() : ''.toUpperCase();
      const textData = query.toUpperCase()
     return itemData.indexOf(textData) > -1;  
    })
      setFilter(newData);
      setSearch(query);

      } else{
        setFilter(data)
        setSearch(query)
      }
      
 

  
    
   
     
   }

   

  

 

    return (

      <ScrollView style={styles.container}
      
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={submitData}/>
      }>

        <View style={styles.search}>
          <TextInput placeholder="Search" value={search}  onChangeText={e => fetches(e)}  style={{ fontWeight: "normal", fontSize: 18, width: 260 }} />
          <Image source={require('../../../assets/noun.png')} style={{ height: 20, width: 20, marginLeft: 80 }} />
                </View>
        <View style={styles.location}>
          <EvilIcons name="location" size={38} color="black" onPress={() => {navigation.navigate('PostInfo')}} />

        </View>
     
        <View style={styles.grid}>
          {
                <FlatList
              data={filter}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'center' }}
                  keyExtractor={(id, index) => id._id}
                 renderItem={({ item }) => (
                
                      <TouchableOpacity onPress={() => navigation.navigate("HomeDetail",{item})} style={styles.list}>
                  {/* <Image source={item.img} style={{width:150, height:120}} />  */}
                  <Image key={item._id} source={ {uri:`${item.img}`}} style={{ width: 135, height: 120 }} />
                 {/* {console.log('check with data', item._id)} */}
                  {/* <Text>{ item.title}</Text> */}
                </TouchableOpacity>
                      
                  )}
            />
              }
        </View>
    
        
      </ScrollView>
    )
  
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey', 
      },
  search: {

    backgroundColor:"grey",
    paddingVertical: 8,
    marginHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems:"center"
      
      },
      location: {
        marginTop: '4%',
        marginLeft: '3%'
  },
  grid: {
    marginTop: '5%'
  },
  list: {
    borderRadius: 4,
    flex: 0.5,
    margin:0
  }
     
})
