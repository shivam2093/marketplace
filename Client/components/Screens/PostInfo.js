import React,{useContext} from 'react'
import { View, Text, StyleSheet,  TextInput, Button, Picker } from 'react-native'
//import {Picker} from '@react-native-picker/picker'
import { useState } from 'react';
import {Authcontext} from '../../Navigator/Provider'

const PostInfo = ({ navigation }) => {
    const { category, setCategory } = useContext(Authcontext);
    const {condition, setCondition } = useContext(Authcontext);
    const {description, setDescription } = useContext(Authcontext);
    const [textInputName, setTextInputName] = useState('');


    const textInput = () => {
        // if (!textInputName.trim()) {
        //     alert('Enter this field before proceed')
        //     return;
        // }
        // else {
             navigation.navigate('PostPrice');
          // }
        }

    return (
        <View style={styles.details}>
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
                    <Text style={{ fontSize: 15 }}>Description&nbsp;</Text>
                    <Text style={{fontSize:13}}>(required)</Text>
                    </View>

                <TextInput  value={description} onChangeText={value => setDescription(value)} style={{borderWidth:1, borderRadius:3, marginTop:5, height:80,textAlignVertical:'top' }}placeholder="tell about product you want to sell"/>
                </View>
                    <View  style={styles.bottomButton}>
                   <Button   color='green' title="Next"  onPress={textInput} />
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
        marginTop:195
    }

})