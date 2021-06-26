import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'

import CheckBox from '@react-native-community/checkbox'
import {Picker} from '@react-native-picker/picker'
import PDFView from 'react-native-view-pdf'
import { useState } from 'react/cjs/react.development'

import LessonList from '../Student/LessonList.js'

import IpAddress from '../../Enviornment/Ipconfig.js'
/**
* @author
* @function CheckAssignment
**/

const stuList=[{
  studentName:'17-arid-3460',
  studentID:0,
},
{
  studentName:'17-arid-3461',
  studentID:1,
},
{
  studentName:'17-arid-3462',
  studentID:2,
},
{
  studentName:'17-arid-3463',
  studentID:4,
},

]
const CheckAssignment = (props) => {

  const[LessonNo,setLessonNo]=useState(0);
  const [studentList,setStudentList]=useState([])

  const getListOfStudents=(LessonNo)=>{
    try{
      fetch(`http://${IpAddress}/backend/api/Teacher/GetStudentList?Lesson=${LessonNo}`)
      .then(res=>res.json())
      .then((res)=>{
         console.log(res)
         setStudentList(res)
        })
      }catch(e){
        console.debug(e.toString())
      }
          
      

  }

const { container } = styles
 return(
  <View style={container}>
    <View style={{width:'90%',height:120,justifyContent:'center',alignContent:'center'}}>
    <View >
      <Text style={styles.heading1}> Select Assignment NO</Text>
      </View>
      
        <View>
      <Picker style={styles.dataBasePiker}
 dropdownIconColor="#21130d" 
 mode="dropdown"
  selectedValue={LessonNo}
  onValueChange={((itemValue, itemIndex)=>{
    setLessonNo(itemValue)
    getListOfStudents(itemValue)
  }
  )
  }>
    {
      LessonList.map((data,index)=>{
        return(  <Picker.Item key={index} label={data.id.toString()} value={data.id} />)
      })
    }

</Picker>
</View>
      </View>
    <View>

        <View> 
          <Text  style={styles.heading1} >List of Student</Text>
        </View>
      
        <View style={{display:'flex',flexDirection:'column',justifyContent:'center'}} >
          {
            studentList!=null?
            studentList.map((data,index)=>{
              return(
                <View key={index}>
                  <TouchableOpacity onPress={()=>props.navigation.navigate('TeacherExQuery',{
                    userName:data.UserName,
                    LessonNo:data.LessonNo,
                    
                  })}>
                  <Text style={styles.ListDesign}>{data.UserName}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
            :Null
          }
        </View>

  </View>
    </View>
   
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  heading1:{
    fontSize:18,
    textAlign:'center',
    marginTop:10,
    color:'#fb5b5a',
    fontWeight:'600'
        },
        ListDesign:{
          fontSize:16,
          padding: 5,
          margin:5,
          textAlign:'center'
        }
})
export default CheckAssignment