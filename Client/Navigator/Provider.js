import React, {  createContext, useState, useReducer } from 'react';
import {reducer as userReducer, initialState } from '../components/userReducer'
// import * as ImagePicker from 'expo-image-picker'
// import * as Permissions from 'expo-permissions'

export const Authcontext = createContext();

 export const AuthProvider = ({children}) => {

     const [user, setUser] = useState("");
     const [img, setImg] = useState("");
     const [title, setTitle] = useState("");
     const [category, setCategory] = useState("");
     const [condition, setCondition] = useState("");
     const [description, setDescription] = useState("");
     const [price, setPrice] = useState("");
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [state, dispatch] = useReducer(userReducer,initialState)
     const [url, setUrl] = useState('');
     const [data, setData] = useState([]);
     const [mydata, setMyData] = useState([]);

     return (

        <Authcontext.Provider
             value={{
                 mydata,
                 setMyData,
                 data,
                 setData,
                 url,
                 setUrl,
                 state,
                 dispatch,
                user,
                 setUser,
                 img,
                setImg,
                title,
                setTitle,
                category,
                setCategory,
                condition,
                setCondition,
                description,
                setDescription,
                price,
                 setPrice,
                 name,
                 setName,
                 email,
                 setEmail,
                 password,
                 setPassword         
        }}
        >
            {children}
            
            </Authcontext.Provider>


    );

}

// export default AuthProvider