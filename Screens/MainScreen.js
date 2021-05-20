import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
 
} from "react-native";
const  MainScreen=({navigation})=>{
  return(
    <View style={{flex:1,alignContent:'center',display:'flex',flexDirection:'column'}}>
      <View style={styles.icon}>
<Image source={require('../assets/cloud-database.png')} style={{width:190,height:180,marginLeft:20,}}/>
      </View>
      <View style={{flex:3}}>
        <Text style={styles.heading}> BIIT Database Tutor with Assignmnet </Text>
      </View>
      <View style={{flex:1}}>
        <Text style={{fontSize:24,marginLeft:20}}>  Login As </Text>
      </View>
      <View style={{flex:4}}>
      <TouchableOpacity  style={styles.btn} onPress={()=>navigation.navigate('Home',{screen:'Student'})}>
        <Text style={styles.title}> Student</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}  onPress={()=>navigation.navigate('Teacher')} >
        <Text style={styles.title} > Teacher</Text>
      </TouchableOpacity>
      </View>
    </View>
   )
}
const styles=StyleSheet.create({
  icon:{
width:256,
height:256,
borderWidth:0.2,
borderColor:'#676d6e',
borderRadius:128,
justifyContent:'center',
alignSelf:'center',
overflow:'hidden',
shadowRadius:2,
  },
  heading:{
    fontSize:28,
    fontWeight:'bold',
    fontFamily:'sans-serif',
    padding:20,
    color:'#fb5b5a',
    letterSpacing:1.5,
    margin: 10,
    lineHeight:40,

  },
  btn:{
    width:'80%',
    backgroundColor:'#fb5b5a',
    height:40,
    alignContent:'center',
    marginBottom:30,
    justifyContent:'center',
    marginLeft:25
  },
title:{
  fontSize:20,
  textAlign:'center',
  color:'#fff',
  justifyContent:'center',
  padding:5
}
})

export default MainScreen;