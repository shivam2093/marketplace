import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Location = ({navigation}) => {
    return (
        <View style={styles.container}>

        <Text>Location</Text>
        </View>
    )
}

export default Location

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: 'grey'
    }
})
