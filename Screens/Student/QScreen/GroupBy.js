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

const GroupBy=(props)=>{
    return(
      <View style={{flex:1,backgroundColor:'#fff'}}>     
      <ScrollView style={{position:'relative'}}>
          <View style={{marginTop:10}}>
            <Text style={styles.intro}>
            The GROUP BY statement is used in conjunction with the aggregate functions to group the result-set by one or more columns.
            {"\n"}
            </Text>
            
            <Text style={styles.syntax}>
            SQL Aggregate function  Syntax
            </Text>
            <Text>
            SELECT column_name(s) FROM table_name WHERE condition GROUP BY column_name(s) ORDER BY column_name(s)
            </Text>
            </View>
            <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                  <Image source={require("../../../assets/Examples/Ag1.png")}  resizeMode='contain' style={{width:'100%',height:250}} />
                </View>

         </ScrollView>       
    </View>
    )
}
const styles=StyleSheet.create({

  intro:{
      fontSize:16,
      fontFamily:'sans-serif',
      padding:10,
      lineHeight:20
  },
  syntax:{
      fontSize:16,
      color:'#fb5b5a',
      fontWeight:'bold'
  }, DatabaseView:{
      flex:1,
      justifyContent:'center',
      width:'90%',
      marginTop:10,
      marginLeft:20
    },
    heading1:{
fontSize:18,
textAlign:'center',
marginTop:10,
color:'#fb5b5a',
fontWeight:'600'
    },
    dataBasePiker:{
      borderWidth:1,
      marginTop:10,
      fontSize:20,
      marginLeft:15,
      borderColor:'black',
      color:'black',
      width:'70%'
    },
    TableView:{
      flex:1,
justifyContent:'center',
width:'90%',
    },
    ColumView:{
      flex: 1,
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    display:'flex',
    width:'50%',
    alignSelf:'center',
    borderWidth:0.1,
    backgroundColor:'#fff'
    },
    QueryView:{
     
      justifyContent:'center',
      width:'90%',
    },
    ColumnTextView:{
      height:40,
      backgroundColor:'#fff',
      marginTop:20,
      width:'95%',
      marginLeft:10,
      borderBottomWidth:0.3
    },
    modal: {
      flex: 1,
      padding: 10,
    },
    text: {
      color: '#3f2949',
      marginTop: 10,
    },
    Mbtn:{
      width:150,marginTop:10,marginRight:10,
     
    }


})
export  default GroupBy;