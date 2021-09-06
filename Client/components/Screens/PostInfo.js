import React,{useContext} from 'react'
import { View, Text, StyleSheet,  TextInput, Button, Picker } from 'react-native'
//import {Picker} from '@react-native-picker/picker'
import { useState } from 'react';
import {Authcontext} from '../../Navigator/Provider'
import { useForm, Controller } from 'react-hook-form'
import Input from '../Input/Input'


const PostInfo = ({ navigation },props) => {
    const {control,register ,handleSubmit, formState:{errors} } = useForm();
    const { category, setCategory } = useContext(Authcontext);
    const {condition, setCondition } = useContext(Authcontext);
    const {description, setDescription } = useContext(Authcontext);
    const [textInputName, setTextInputName] = useState('');


    const textInput = (data) => {
       
       // console.log(data.Title)
             navigation.navigate('PostPrice',{data});
       
        }

    return (
        <View style={styles.details}>
            <View>
                    <Text style={styles.label}> Title</Text>
                    <Controller
                    defaultValue=""
                    name="Title"                    
                    control={control}
                    rules={{required: {value: true , message:'Title field required'}}}
                    
                    render={({ field: {onChange, value}}) =>
                       <Input
                       error={errors.Title}
                       errorText = {errors?.Title?.message}
                       onChangeText = {(value) => onChange(value)}                  
                       style={styles.label2}
                       placeholder="Title"

                    placeholderTextColor='grey'
                       value={value}
                      
                       /> 
                    }
                 />

               {/* <TextInput value={title} onChangeText={value => setTitle(value)} style={{borderColor:'black', width:400,borderWidth:2, borderRadius:5, fontSize:20}} placeholder='Title'/> */}
               <Text>For example: Brand,model,color, and size.</Text>
                
                </View>   
            
            <View style={styles.picker}>

                <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 15 }}>Category&nbsp;</Text>
                    <Text style={{fontSize:13}}>(required)</Text>
                    </View>

            <Picker selectedValue={category}
                onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)}>
                    <Picker.Item label="Category" value="Category"/>
                    <Picker.Item label="Home" value="Home" />
                    <Picker.Item label="Electronics" value="Electronics" />
                    <Picker.Item label="Automobile" value="Automobile" />
                    <Picker.Item label="Other" value="Other" />
                    <Picker.Item label="Cars" value="Cars" />
                    
                    
                </Picker>
            </View>
            <View style={styles.picker}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 15 }}>Condition&nbsp;</Text>
                    <Text style={{fontSize:13}}>(required)</Text>
                    </View>

            <Picker selectedValue={condition}
                onValueChange={(itemValue, itemIndex) =>
                    setCondition(itemValue)}>
                    <Picker.Item label="Condition" />
                    <Picker.Item label="Used(Normal wear)" value="Used(Normal wear)" />
                    <Picker.Item label="New" value="New" />
                    <Picker.Item label="Old" value="Old" />
                </Picker>
            </View>
            <View style={styles.picker}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 15 }}>Description</Text>
                    <Text style={{fontSize:13}}>(required)</Text>
                    </View>

                    <View>
                    
                    <Controller
                    defaultValue=""
                    name="Description"                    
                    control={control}
                    rules={{required: {value: true , message:'Description field required'}}}
                    
                    render={({ field: {onChange, value}}) =>
                       <Input
                       value={value}
                       error={errors.Description}
                       errorText = {errors?.Description?.message}
                       onChangeText = {(value) => onChange(value)}                  
                       style={styles.label1}
                       placeholder="Description"

                    placeholderTextColor='grey'
                       
                      
                       /> 
                    }
                 />
                
                </View>   
            
{/* 
                <TextInput  value={description} onChangeText={value => setDescription(value)} style={{borderWidth:1, borderRadius:3, marginTop:5, height:80,textAlignVertical:'top' }}placeholder="tell about product you want to sell"/> */}
                </View>
                    <View  style={styles.bottomButton}>
                   <Button   color='green' title="Next"  onPress={ handleSubmit(textInput) } />
                   </View>
        </View>
    )
}

export default PostInfo

const styles = StyleSheet.create({

    details : {
       
     padding:10

    },
    picker: {
        padding: 10, 
    },
    bottomButton: {
        width: '100%',
        marginTop:140,
        
    },label1:{
        width:380,
        borderWidth:1,
    height:100,
         borderRadius:4,
          fontSize:15,
          textAlignVertical:'top'
    },
    label2:{
       
        width:400,
        borderWidth:1,
         borderRadius:4,
          fontSize:20
    }

})