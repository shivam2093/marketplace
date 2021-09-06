import React from 'react';
import { Text} from 'react-native';
import { FooterTab, Footer, Button } from 'native-base'
import { MaterialCommunityIcons,AntDesign,Entypo } from '@expo/vector-icons'; 
import styles from './FooterStyles';
import Home from '../Screens/Home';
import Post from '../Screens/Post';

/*
<MaterialCommunityIcons name="post/offer" size={24} color="black" />
<AntDesign name="profile" size={24} color="black" />
*/
const Footers = ({navigation}) => {
     
    const tabs = [{
        title: "Home",
        icon: "home",
        subtitle: ""
    }, {
        title: "Inbox",
            icon: "message1",
            subtitle: ""
        },
        {
            title: "Post",
            icon: "camera",
            subtitle: ""
      
        },
        {
      
            title: "Sell",
            icon: "mobile1",
            subtitle: ""
      
            },
            {
                title: "Profile",
                icon: "profile",
                subtitle: ""
                    }
    ]

   
  
  

   

    return (
         <Footer>
         <FooterTab style={styles.foot}  >
             {
                 tabs.map((obj, index) => {

                     return (
                    
                         <Button key={index} onpress={() => navigation.navigate } >
                            {/* 
                          <Entypo name={obj.title == 'Home' ? obj.icon1 : obj.icon2} size={12} color="black" />
                           */}
                          <AntDesign name={obj.icon} size={20} color="black" /> 
                             {/*
                             <MaterialCommunityIcons name={obj.title == 'Post' ? obj.icon3 : obj.icon4} size={12} color="black" style={{ marginBottom: 20 }} />
                          <AntDesign name={obj.title == 'Profile' ? obj.icon5 : ""} size={10} color="black" />
                              */}
                             <Text style={styles.text} > {obj.title}</Text>
                             
                             </Button>
                            
                     )
                 })

                 
             }

            </FooterTab>
            </Footer>
    )
}


export default Footers;