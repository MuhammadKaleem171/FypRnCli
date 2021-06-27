import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'

import {
    View,Text,TouchableOpacity,Button,Modal,StyleSheet,TextInput
}
from 'react-native'

import IpAddress  from '../../Enviornment/Ipconfig'
import LessonList from '../Student/LessonList'

const ExecuteQuery=(props)=>{
    const[result,setResult]=useState([])
    const [showModal,setshowModal]=useState(false);
    const [lessonNo,setLessonNo]=useState(0)
    const [QuestionNO,setQuestionNO]=useState(0);

    
    const mData=()=>{
        const databaseName=props.route.params.database
        const query=props.route.params.Query
        console.log('eeeeeeeeeeeeeeeeeee',databaseName)
        fetch(`http://${IpAddress}/backend/api/values/ExcQuery?query=${query}&Table=${databaseName}`)
        .then(res=>res.json())
        .then((data)=>{
          console.log('cccccccccccccccccccccc',data)
            setResult(data[0])
            
            
            result.map(m=>{
              let va=Object.values(m)
              for(let v of va){
                console.log(`valuesssss${v}`)
              }
              for (const [key, value] of Object.entries(m)) {
                console.log(`${key}: ${value}`);
              }
            })
            
        });       
        
        console.log(result)
       }
    
       const SubmitQuestion=()=>{
         console.log('cccccccccccccccccccccccccccccc')
         const QData={
           UserName:'17-arid-3460',
           AssignmentID:props.route.params.AssignmentID,
           classID:1,
           databaseName:props.route.params.database,
           QuestionNo:QuestionNO,
           Answer:props.route.params.Query,
           LessonNo:props.route.params.lessonNo,
         }

         console.log(QData)
       }
    const Taheader=()=>{
        if(result===undefined){
        }
        if(result.length>=1){
        let d=Object.keys(result[0])
        const d1 =d.filter((item,index)=>d.indexOf(item)==index)
       return(
     <View style={{borderWidth:1,flexDirection:'row',marginTop:10}}>
       {
         d1.map((i,index)=>(
           <View  key={index} style={{flexDirection:'row',display:'flex',width:70,}}>
             <Text style={{textAlign:'center'}} > {i}</Text>
           </View>
            
         )
           )}
     </View>
       )
       }
     }
return(
    <View>
       
      <View style={{marginTop:20,marginLeft:10}}>
        <Text style={{fontSize:16,padding:10}}> {props.route.params.Query}</Text>
      </View>
<Button onPress={mData} title="Execute Query"
color="#841584"
accessibilityLabel="Learn more about this purple button"/> 
<Button onPress={()=>setshowModal(true)} title="Submit As Assignment"
color="#841584"
accessibilityLabel="Learn more about this purple button"/> 

      
       { Taheader()}
      { 
      result!==undefined?
      
        result.map((m,i)=>{
          
            return(
              <View key={i} style={{flexDirection:'row'}} >{
              Object.keys(m).map((i,index)=>(
              <View  key={index} style={{flexDirection:'row',display:'flex',width:70}}>
                <Text style={{textAlign:'center',fontSize:12}} >  {m[i]}</Text>
              </View>
               
            )
              )}
              </View>
              )
        }
          ):null
    }
    <Modal
          animationType={'slide'}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View >
          <View>
            <View style={{marginTop:10,marginBottom:10}}>
<Text style={styles.heading1}>Select LessonNo </Text>
<View>
<Picker style={styles.dataBasePiker}
             dropdownIconColor="#21130d" 
             mode="dropdown"
            selectedValue={lessonNo}
            onValueChange={((itemValue, itemIndex)=>{
              setLessonNo(itemValue)
            }
            )
            }
            >
            {
              LessonList.map((data,i)=>{
                return(
                  <Picker.Item key={i} label={data.id.toString()} value={data.id}/>
                )
              })
            }

            </Picker>
</View>
<View>
  <View>
    <Text style={styles.heading1}>
      Insert Question No
    </Text>
    </View>
    <View>
<TextInput 
placeholder="Question No"
keyboardType="numeric"
borderBottomWidth={1}
onChangeText={(QuestionNO)=>setQuestionNO(QuestionNO)}
/>

    </View>
</View>
            </View>
            <View>
  <Button 
  onPress={()=>{
    SubmitQuestion()
    setshowModal(!showModal);
   
  }
} title="Submit Question"
  color="#fb5b5a"
  accessibilityLabel="Learn more about this purple button"/> 
      </View>             
   </View>
            </View>
           <Button
              title="Click To Close Modal"
              onPress={() => {
                setshowModal(!showModal);
                console.log(showModal)
              }}
            /> 


           
        </Modal>
</View>

)
}

const styles=StyleSheet.create({
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
         
        },
        AssignmentView:{
  position:'relative',
  top:-60
        },
        AssignmentTitle:{
          position:'relative',
  top:-50,
        },
        SubmitBtn:{
          position:'relative',
  top:-30,
        },
        AssignmentmodalView: {
          width:'90%',
          height:600,
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2    
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5},
          FileView:{
            display:'flex',
            width:'90%'
          },
          fileUpload:{
            display:'flex',
           marginTop:15,
            width:'90%',
            borderWidth:1,
          },
          preView:{
              width:200,
              height:200,
              borderWidth:1,
              position:'relative',
              top:20,
              right:-40
          },
          btn:{
            borderWidth:1,
            width:200,
            height:30,
            borderRadius:5,
            alignSelf:'center',
            position:'relative',
            left:-18,  
             backgroundColor:'#fb5b5a'
          },
          btn1:{
            borderWidth:1,
            top:10,
            width:200,
            height:30,
            borderRadius:5,
            alignSelf:'center',
            position:'relative',
            left:-20,
            backgroundColor:'#fb5b5a'
          },
          btntext:{
            fontSize:14,
            color:'white',
            textAlign:'center'
          }
})
export default ExecuteQuery;