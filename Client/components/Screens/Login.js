import React,{useContext} from 'react'
import { StyleSheet, View,KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { Text } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { auth } from '../firebase';
import { Authcontext } from '../../Navigator/Provider';
import { useNavigation } from '@react-navigation/native';
//import AsyncStorage from '@react-native-community/async-storage'
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import Input from '../Input/Input'
const Login = () => {

    const navigation = useNavigation();  
    const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PWD = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const {control,register ,handleSubmit, formState:{errors} } = useForm();
    const { email, setEmail } = useContext(Authcontext);
    const { password, setPassword } = useContext(Authcontext);
    const { state, dispatch } = useContext(Authcontext);
    const { mydata, setMyData } = useContext(Authcontext);
    // const [imageUrl, setImageUrl] = useState('');
   
   // const { register } = useContext(Authcontext);
 
   const login = (data) => {

    console.log('hellodata', data.Email)

        fetch('http://192.168.0.43:3000/users/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": data.Email,
                "password": data.Password
            })
        }).then(res => res.json())
            .then(async data => {
               console.log("check match",data.token)
               const puthere = data.token
                if (data.error) {
                    ToastAndroid.show(data.error, ToastAndroid.CENTER);
            } else {
                 //  console.log(" check match",data.user)
                   await  SecureStore.setItemAsync('jwt',puthere)
                   await SecureStore.setItemAsync('user', JSON.stringify(data.user))
                  //await  AsyncStorage.setItem('jwt', data.token)
                  // await AsyncStorage.setItem('user',JSON.stringify(data.user))
                   dispatch({type:"USER",payload: data.user})
                   ToastAndroid.show(`Hello ${JSON.stringify(data.user.name)}`, ToastAndroid.BOTTOM);
                    setMyData(data.user)   
                }
            
            }).catch(err => console.log(err))
    
}

   const handleAuth = () => {
       navigation.navigate('Home');
    
    }
     return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
            <View style={styles.headerIn1}>
                <Text h4 style={{ color: "white", fontWeight: 'bold', fontSize:15 }}> SignIn </Text>
            </View>
              <View style={styles.headerIn2}>
                <Text style={{color:"#f0e68c", fontSize: 15}} onPress={handleAuth}> Cancel </Text>
                </View>
                </View>
            <Text h1 style={{ color: '#f0e68c', marginTop: 30 }}> Buy/Sell </Text>

            <View style={styles.inputContainer}>

            <View>
                    <Text style={styles.label}> Email </Text>
                    <Controller
                    defaultValue=""
                    name="Email"                    
                    control={control}
                    rules={{required: {value: true , message:'Email field required'}}}
                    
                    render={({ field: {onChange, value}}) =>
                       <Input
                       error={errors.Email}
                       errorText = {errors?.Email?.message}
                       onChangeText = {(value) => onChange(value)}                  
                       style={styles.label1}
                       placeholder="Email"

                    placeholderTextColor='#fff'
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
                       <Input
                        error={errors.Password}
                        errorText = {errors?.Password?.message}
                       onChangeText = {(value) => onChange(value)}                  
                        style={styles.label1}
                        secureTextEntry
                       placeholder="Password"
                       placeholderTextColor='#fff'
                       value={value}
                      
                       /> 
                       
                    }
                 />
                
                </View>
            {/* <Input
                placeholder="Email"
                autoFocus type="email"
                       value={email}
                       style={{color:'pink'}}
                onChangeText={(text) => setEmail(text)}
                />
            <Input placeholder="Password"
                secureTextEntry type="password"
                       value={password}
                       style={{color:'white'}}
                onChangeText={ (text) => setPassword(text)}/> */}
               </View>
               <Button  style={styles.button} mode="contained" onPress={handleSubmit(login)}>Login</Button>
            <Button  style={styles.button}
                mode="contained"
                title="Register"
                onPress={() => navigation.navigate('Register')} >Register</Button>

            <Button  style={styles.button} mode="text" color="white" onPress={() => navigation.navigate('Reset')}>Reset password</Button>
            
               <Icon name="google" style={{ fontWeight: 'bold', fontSize: 22, color: 'white', marginTop: 30, justifyContent: 'space-between' }}
                   onPress={() => navigation.navigate('Location')} >
                        <Text style={{ color: "tomato", fontWeight: 'bold' }}>Login with Google</Text></Icon>
            
          
           </KeyboardAvoidingView>
       )
}

export default Login

const styles = StyleSheet.create({
    
    container:
    {
        flex: 1,
        backgroundColor: '#00008b',
        alignItems: "center",
        justifyContent: 'flex-start',
        padding: 10,
    
    },
    header: {
        flexDirection: 'row',
        alignItems:'center'

    },
    headerIn1: {
        flex:1,
        alignItems: 'center',
        marginTop:30
    },
    inputContainer: {
        width:300
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    label : {
        color:'#fff'
    },
    label1:{
        color:'#fff'
    }

})
