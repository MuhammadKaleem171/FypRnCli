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
        <View>
        <Text>
       
        DBS LAB MANUALS76Lab # 10Aggregate Functions (GROUP Clause and HAVING Clause)
        The SQL GROUP BY StatementThe GROUP BY
         statement is used in conjunction with the aggregate functions to group the result-set by one or more columns.
         
        </Text>
 
        <TouchableOpacity onPress={()=> props.navigation.push('ExQuery')} >
              <Text >Ex</Text>
              </TouchableOpacity>
    </View>
    )
}
export  default GroupBy;