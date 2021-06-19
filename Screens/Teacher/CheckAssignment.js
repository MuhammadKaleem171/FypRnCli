import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CheckBox from '@react-native-community/checkbox'
import {Picker} from '@react-native-picker/picker'
import PDFView from 'react-native-view-pdf'
import { useState } from 'react/cjs/react.development'

import LessonList from '../Student/LessonList.js'
/**
* @author
* @function CheckAssignment
**/
const CheckAssignment = (props) => {

  const[LessonNo,setLessonNo]=useState(0);

const { container } = styles
 return(
  <View style={container}>
    <View style={{width:'90%',height:120,justifyContent:'center',alignContent:'center'}}>
    <View >
      <Text style={{textAlign:'center'}}> Select AssignmentNO</Text>
      </View>
      
        <View>
      <Picker style={styles.dataBasePiker}
 dropdownIconColor="#21130d" 
 mode="dropdown"
  selectedValue={LessonNo}
  onValueChange={((itemValue, itemIndex)=>{
    setLessonNo(itemValue)
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
          <Text style={{textAlign:'center'}}>List of Student</Text>
        </View>
      
        <View>
        </View>

  </View>
    </View>
   
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  }
})
export default CheckAssignment