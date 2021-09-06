import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View, Image, Dimensions, KeyboardAvoidingView } from 'react-native'
import { Font } from 'expo';
import { Avatar, Button } from 'react-native-paper';
const {width} = Dimensions.get('window');    
const height = width * 0.6 ;
const fetchFont = () => {

    return Font.loadAsync({
         'Benne-Reg' : require('../../../assets/fonts/Benne-Regular.ttf')
     })
 }

const HomeDetail = ({ route, navigation}) => {

   
    const [here, setHere] = React.useState([]);


        useEffect(() => {

             let {item } = route.params;
            setHere(item)

           // console.log("home detail", here._id)
        }, [])

       
 

    return (
      
        <View style={styles.container}>
  
     <Image key={here._id} source={{uri:`${here.img}` }} style={{ width: '100%', height: '120%' }} />     
     <Text style={{fontSize:20, marginTop:5}}>{here.title}</Text>
     <Text style={styles.txt}> $ {here.price}</Text>
     <Text > condition: {here.condition}</Text>
     <Text>{here.category}</Text>  
  
     <View style={styles.fix}>
     
     <Avatar.Image  source={{  uri:   `${here.postedby?.img}`}} size={90} style={{}}  /> 
     <Text style={{fontSize: 15, marginLeft:20}}>{ here.postedby?.name == null ? <Text style={{fontWeight:'bold'}}>User deleted</Text> : here.postedby?.name } </Text>
     </View>
     <View style={styles.button}>
         <Button onPress={() => navigation.navigate("Ask",{here})} contentStyle={{width:200}} mode="contained" >Ask offer</Button>
         <Button contentStyle={{width:200}} mode="outlined" >Make offer</Button>
     </View>
        </View>
       
    )
}

export default HomeDetail
        const styles = StyleSheet.create({
            container:{ height, 
                        width,
                        alignItems:'flex-start',
                        
                    },
           
                fix:{
                    flexDirection:'row',
                    alignItems:'center',
                    marginTop:20,
                    

                },
                button:{
                    marginTop:'3%',
                    flexDirection: 'row',
                    padding: 5, 
                    
                }
                
        },
)
