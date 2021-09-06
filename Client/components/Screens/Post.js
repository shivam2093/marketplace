import React,{useState,useContext} from 'react'
import { StyleSheet, View,KeyboardAvoidingView } from 'react-native'
import {Button } from 'react-native-paper'

import {  Input, Text,  } from 'react-native-elements'
import { TextInput, ToastAndroid, Alert } from 'react-native'
import { Authcontext } from '../../Navigator/Provider';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

  
const Post = ({ navigation }) => {
    
    const { img, setImg } = useContext(Authcontext);
    const {title, setTitle } = useContext(Authcontext);
    const [textInputName, setTextInputName] = useState('');
    const { url, setUrl } = useContext(Authcontext);
    
     const pickFromGallery = async () => {
        const {granted} =   await Permissions.askAsync(Permissions.CAMERA)
         
             if (granted) {
               let data =  await ImagePicker.launchImageLibraryAsync({
                     mediaTypes: ImagePicker.MediaTypeOptions.Images,
                     allowsEditing: true,
                     aspect: [1, 1],
                     quality:0.5
               })
               if (!data.cancelled) {
                 let newfile = {
                     uri: data.uri,
                     type: `test/${data.uri.split(".")[1]}`,
                     name: `test.${data.uri.split(".")[1]}`
                 }
                 handleUpload(newfile)
            }
             }
             else {
                 Alert.alert('Need permission ')
             }
         
         }
       
    
     const pickFromCamera = async () => {
        const {granted} =   await Permissions.askAsync(Permissions.CAMERA)
         
             if (granted) {
               let data =  await ImagePicker.launchCameraAsync({
                
                     mediaTypes: ImagePicker.MediaTypeOptions.Images,
                     allowsEditing: true,
                     aspect: [1, 1],
                     quality:0.5
               })
                 if (!data.cancelled) {
                     let newfile = {
                         uri: data.uri,
                         type: `test/${data.uri.split(".")[1]}`,
                         name: `test.${data.uri.split(".")[1]}`
                     }
                     handleUpload(newfile)
                }
             }
        
             else {
                 Alert.alert('Need permission ')
             }
         
         }
    
    
    
      const handleUpload = (img) => {
    
        const data =   new FormData()
           data.append('file', img)
          data.append('upload_preset', 'react-native-app')
          data.append("cloud_name",'shivam2k7')
          fetch("https://api.cloudinary.com/v1_1/shivam2k7/image/upload", {
              method: 'POST',
              body:data
          }).then(res => res.json())
              .then(data => {
    console.log(data)
                 setUrl(data.url)
                  
          })
      
      }
    
   
    
   
   
    const textInput = () => {
        //  if (!title.trim()) {
        //      ToastAndroid.show('add fields', ToastAndroid.CENTER);
            
        // }
        
        !title.trim() ? ToastAndroid.show('add fields', ToastAndroid.CENTER)  : navigation.navigate('PostInfo');
        //  else {
        //      navigation.navigate('PostInfo');
        // }
        }
  
       return (
           <View behavior='padding' style={styles.container}>
               <Text style={{color:'green', left:170}}  onPress={ () => navigation.navigate('Home')}>Cancel </Text>
               <View style={styles.button}>
                
                   <Button icon={img==" "? "upload":"check"} mode="contained" onPress={()=> pickFromCamera()}>Take Picture</Button>
                   <Button icon={img== " "? "upload":"check"} mode="text"   onPress={()=>pickFromGallery()}  >Upload photo</Button>
                   </View>
               <View style={styles.text}>
                

               <TextInput value={title} onChangeText={value => setTitle(value)} style={{borderColor:'black', width:400,borderWidth:2, borderRadius:5, fontSize:20}} placeholder='Title'/>
                <Text>For example: Brand,model,color, and size.</Text>
               </View>
               <View style={styles.bottomButton}>
                   <Button color='green'  onPress={textInput}  >Next</Button>
                   </View>
               </View>
       )
}



export default Post 

const styles = StyleSheet.create({
    
    container:
    {
        flex: 1,
        backgroundColor: '#fff8dc',
        alignItems: "center",
        justifyContent: 'flex-start',
        padding: 10
    },
    text: {

        flex:1,
        flexDirection:'column',
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent:'flex-start'
        
    },
    button: {
        flexDirection: 'column',
        
        width: '100%',
        marginTop: 30,
        padding: 10, 
        
    },
    bottomButton: {
        width: '100%'
    }
})
