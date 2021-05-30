import React, { Component ,useEffect} from 'react';
import { View, Text,Image,StyleSheet} from 'react-native';

const StartScreen =(props)=>{

    useEffect(()=>{
        setTimeout(() => {
          props.navigation.replace('MainScreen')
            }, 3000);
    })
    return(
        <View style={{justifyContent:'center',display:'flex',alignItems:'center',flex:1,backgroundColor:'#fb5b5a'}}>
            <View style={styles.imageContainer}>
            <Image source={require('../assets/cloud-database.png')} style={styles.imagestyle} />
            </View>
            <View>
            <Text style={styles.heading}>Biit Database Tutor with Assignment</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    imageContainer:{
       // backgroundColor:'#d7dfe5',
        width:300,
        height:300,
        borderRadius:150,
        borderWidth:4,
        borderColor:'black'
    },
    imagestyle:{
        resizeMode: 'stretch',
        width:240,
        height:240,
        alignSelf:'center',
        position:'relative',
        top:15,

    },
    heading:{
        fontSize:19,
        fontWeight:'bold',
        paddingTop:20,

    }
})

export default StartScreen;
