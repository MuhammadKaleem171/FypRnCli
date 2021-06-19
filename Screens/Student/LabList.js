
import React,{useState,useEffect}from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    Switch,Alert,
  } from "react-native";
 import LessonList from './LessonList.js'
  
  const LabList=(props)=>{
      console.log(props)
      return (
          <View style={{flex:1,}}>
              <ScrollView>
              <View  style={{flexDirection:'row',marginTop:10,justifyContent:'center'}}>
              <View style={styles.labCount}>
              <Text style={styles.txtView1}>Sr . </Text>
              </View>
              <View  style={styles.LabView}>
                 
              <Text style={styles.txtView1} >Learning Objective</Text>
              </View>
              </View>
                  {
                      LessonList.map((data,index)=>{
                        console.log(data.screen)
                return(     
              <View key={index} style={{flexDirection:'row',marginTop:10,justifyContent:'center'}}>
              <View style={styles.labCount}>
              <Text style={styles.txtView}>{data.id}</Text>
              </View>
              <View  style={styles.LabView}>
                  <TouchableOpacity onPress={()=>props.navigation.navigate(data.screen,{Lesson:data.id})}>
              <Text style={styles.txtView}>{data.Content}</Text>
              </TouchableOpacity>
              </View>
              </View>
  )
                      })
  }
              </ScrollView>

          </View>
      )
  }


  const styles=StyleSheet.create({
labCount:{
width:'20%',
borderWidth:0.5,
height:70,
paddingTop:10,
},
LabView:{
    width:'70%',
    borderWidth:0.5,height:70,
},
txtView1:{
    textAlign:'center',
    fontSize:22,
    padding:15
},
txtView:{
  textAlign:'center',
  fontSize:18,
  padding:10
}
  })
  
  export default LabList;