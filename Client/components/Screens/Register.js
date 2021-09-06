import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {  KeyboardAvoidingView, ToastAndroid, View, StyleSheet } from 'react-native'
import {Text} from 'react-native-elements'
import {Authcontext} from '../../Navigator/Provider'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import {Hoshi} from 'react-native-textinput-effects'
import { validateAll } from 'indicative/validator'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { TextInput } from 'react-native'
import { onChange } from 'react-native-reanimated'
import Input from '../Input/Input'
import { Avatar } from 'react-native-elements'

const Register = ({ navigation }) => {
    
    const {control,register ,handleSubmit, formState:{errors} } = useForm();
    // const { name, setName } = useContext(Authcontext);
    // const { email, setEmail } = useContext(Authcontext);
    // const { password, setPassword } = useContext(Authcontext);
    // const { img, setImg } = useContext(Authcontext);
    const { url, setUrl } = useContext(Authcontext);
   // const [error, setError] = useState('');
   
    const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const onSubmit =  (data) => {

            console.log('data',data)
            

            if (url) {
                 
        // if(name.length == 0 || email.length == 0 || password.length == 0){
            //         return ToastAndroid.show('Please add all fields', ToastAndroid.LONG);
            //     }
        

             fetch('http://192.168.0.43:3000/users/signup', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name":  data.Name,
                        "email": data.Email,
                        "password": data.Password,
                         pic: url
                    })
                    
                }).then(res => res.json())
                    .then(data => {
                        if (data.error) {
                           //console.log(data.error)
                            ToastAndroid.show(data.error, ToastAndroid.CENTER);
                        } else {
                            ToastAndroid.show(data.message, ToastAndroid.BOTTOM);
                            setUrl("");
                            navigation.popToTop('Home')
                       // navigation.navigate("Home");
                        }
                
                    }).catch(err => console.log(err))
            }
        }

       // console.log('errors bro', errors)
  
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
    
        const data = new FormData();
           data.append('file', img)
          data.append('upload_preset', 'react-native-app')
          data.append("cloud_name",'shivam2k7')
          fetch("https://api.cloudinary.com/v1_1/shivam2k7/image/upload", {
              method: 'POST',
              body:data
          }).then(res => res.json())
              .then(data => {
    //console.log(data)

                 setUrl(data.url)
                  
          })
      }


    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
           
            <StatusBar style="light" />    
            <Text h4 style={{fontStyle:'normal', color:'black'}}>Create Account </Text>
            <View style={styles.inputContainer}>
            <View>
            <Text style={styles.label}> Profile Picture </Text>
                <Avatar rounded source={{ uri:`${url}`}} size="large" containerStyle={{right:20, borderColor:'black',borderStyle:'solid', borderWidth:2}} />
                </View>
                <View>
                    <Text style={styles.label}> Name </Text>
                    <Controller
                    defaultValue=""
                    name="Name"                    
                    control={control}
                    rules={{required: {value: true , message:'Namefield required'}}}
                    
                    render={({ field: {onChange, value}}) => (
                       <Input
                        error={errors.Name}
                        errorText = {errors?.Name?.message}
                       placeholder="Name"
                       value={value}
                       onChangeText = {(value) => onChange(value)}
                     
                       />
                       
                    )}
                 />
                
                </View>
                <View>
                    <Text style={styles.label}> Email </Text>
                    <Controller
                    defaultValue=""
                    name="Email"                    
                    control={control}
                    rules={{required: {value: true , message:'Email field required'},pattern:{value: REGEX , message:'Email is Invalid'}}}
                    
                    render={({ field: {onChange, value}}) =>
                       <Input
                       error={errors.Email}
                       errorText = {errors?.Email?.message}
                       onChangeText = {(value) => onChange(value)}                  
                    
                       placeholder="Email"
                       value={value}
                      
                       /> 
                    }
                 />
                
                </View>
                <View>
                    <Text style={styles.label}> Password </Text>
                    <Controller
                    defaultValue=""
                    name="Password"            
                    control={control}
                    rules={{required: {value: true , message:'Password field required'}}}
                    render={({ field: {onChange, value}}) =>
                       (
                       <Input
                       error={errors.Password}
                       errorText = {errors?.Password?.message}
                        
                        secureTextEntry   
                    onChangeText = {(value) => onChange(value)}                  
                       placeholder="Password"
                       value={value}
                    
                       /> 
                       )}
                 />
               
                
                </View>
               
                {/* <View>
                    <Text style={styles.label} > Profile Picture </Text>
                    <Controller
                    defaultValue=""
                    name="ProPic"                    
                    control={control}
                   
                    rules={{required: {value: true , message:'Pic required'}}}
                    
                    render={({ field: {onChange, value}}) => (
                       <Input
                        error={errors.ProPic}
                        errorText = {errors?.ProPic?.message}
                       placeholder="Pic URL"
                       value={value}
                       onChangeText = {(value) => onChange(value)}
                     
                       />
                       
                    )}
                 />
                
                </View> */}

                {/* <View>
                    <Text style={styles.label}> ProfilePicture </Text>
                    <Controller
                    name="ProfilePicture"                    
                    control={control}
                    render={(props) =>
                       <TextInput
                       {...props}
                    
                       style={styles.input}
                       value={url}
                       placeholder="URL"
                       onChangeText={(text) => setUrl(text)}
                       /> 
                    }
                 />
                
                </View> */}





                {/* <Hoshi 
                borderColor='#e74c3c'
                label="Name"
                   style={{marginBottom:20, borderColor:'#e74c3c'}}
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)} />
                <Hoshi label="Email"
                  style={{marginBottom:20}}
                    type="text"
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                    {
                        (email.length == 0)
                    }
                 <Hoshi label="Password" secureTextEntry type="text"
                    value={password}
                    style={{marginBottom:20}}
        
                    onChangeText={(text) => setPassword(text)} />
                    {
                     (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8}$/.test(password)) 
                      ?
                     <AntDesign name={'check'} size={20}/>
                    : <Text></Text>

                    }
                  
                    <Hoshi label="Propicture" type="text"
                    value={url}
                    style={{marginBottom:20}}
                    onChangeText={text => setUrl(text)}
                    />
                     {
                (!name || !email || !password) ? <Text style={{fontWeight:'bold'}}>add all fields</Text> : <Text></Text>
                     } */}
                <Button  style={{marginTop:20}} mode="contained" onPress={() => pickFromCamera()} >Upload from camera</Button>
                <Button  style={{marginTop:20}}mode="outlined" onPress={() => pickFromGallery()}>Upload from Gallery</Button>
                
            </View>
            
            <Button 
                onPress ={handleSubmit(onSubmit)}
                style={{marginTop:10}}>Register</Button>
            
            <View style={ {height: 100}}/>

        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        padding: 5,
        backgroundColor:"#fff",
        marginTop:5
        
    },
    inputContainer: {
        width: 300, 
        
        
    },
    label: {
    color:'black'
    },
    input :{
        marginBottom: 20,
        backgroundColor:'black',
        borderRadius:5
    }
})
