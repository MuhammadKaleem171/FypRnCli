
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

  const LessonList=[{
    Content:'SELECT Clause',
    id:1,
    screen:'Select'
  },
  {
      Content:'Arithmetic expressions and column alias',
      id:2,
      screen:'Arithmetic'
  }
  ,
  {
    Content:'Use of concatenation operator and distinct',
    id:3,
    screen:'Concatenation'
 
  },{
    Content:'Order by and Where clause',
    id:4,
    screen:'OrderBy'
  },
  {
    Content:'Logical operators (AND, OR, NOT)',
    id:5,
    screen:'Logical_operators'
  },
  {
    Content:'Group by ',
    id:6,
    screen:'GroupBy'

  },
  {
      Content:'SQL Joins',
      id:7,
      screen:'SQlJoins'
  }
]
  const LabList=(props)=>{
      console.log(props)
      return (
          <View style={{flex:1,}}>
              <ScrollView>
                  {
                      LessonList.map((data,index)=>{
                return(     
              <View key={index} style={{flexDirection:'row',marginTop:10,justifyContent:'center'}}>
              <View style={styles.labCount}>
              <Text style={styles.txtView}>{data.id}</Text>
              </View>
              <View  style={styles.LabView}>
                  <TouchableOpacity onPress={()=>props.navigation.navigate(data.screen,{UserName: 1})}>
              <Text style={styles.txtView}>{data.Content}</Text>
              </TouchableOpacity>
              </View>
              </View>
  )
                      })
  }
              </ScrollView>
              <TouchableOpacity onPress={()=>console.log('dddd')}>
              <Text style={styles.txtView}>hhhhh</Text>
              </TouchableOpacity>

          </View>
      )
  }


  const styles=StyleSheet.create({
labCount:{
width:'20%',
borderWidth:0.5,
height:60,
},
LabView:{
    width:'70%',
    borderWidth:0.5,height:60,
},
txtView:{
    textAlign:'center',
    fontSize:18,
    padding:10
}
  })
  
  export default LabList;