import React,{useState,useEffect}from 'react'
import { View, Text, StyleSheet,TextInput, Button,TouchableOpacity} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'
import PDFView from 'react-native-view-pdf'
import IpAddress from '../../Enviornment/Ipconfig'
import LessonList from '../Student/LessonList.js'


/**
* @author
* @function UploadAssignment
**/
const serverList=[{
    ServerName:"Bscs-8a"
  },
  {
    ServerName:'Bscs-2a'
  }
  ]
  
const UploadAssignment = (props) => {
  const[Database,setDatabase]=useState([])
    const[SelectedDatabase,setSelectedDatabase]=useState()
    const [Assignment,setAssignment]=useState(null)
    const [filedata,setFileData]=useState(null)
    const [lessonNo,setLessonNo]=useState(0)
    console.debug(props)
    const resources = {
        file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : 'content://com.android.providers.downloads.documents/document/4377',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        base64: 'v1Vo19pmSWup3hmztzo0FQ4HPDbi1Zq876nhxNybpdLhyVPbn3tdMTWMiFLsJa87vJMRu/1dgzLOXO3iFtGKQ/lEoX3dfh/8tPZkqRmrBbhYecry+wctS'
      }


      useEffect(() => {

          fetch(`http://${IpAddress}/backend/api/values/GetDatabase`)
          .then(res=>res.json())
          .then((data)=>{
              setDatabase(data)
          });            
        }, 
        
      
        []);
      const selectFile =async()=>{
          try{
              const res =await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],

              }) 
              setFileData(res)
              console.log('res : ' + JSON.stringify(res));
              console.log('URI : ' + res.uri);
              console.log('Type : ' + res.type);
              console.log('File Name : ' + res.name);
              console.log('File Size : ' + res.size);
              RNFetchBlob.fs.readFile(res.uri,'base64').then(
                  (data)=>{
console.log(data)
setAssignment(data)
                  }
              )
          }catch(e){
              console.log(e)
          }
      }
      const resourceType = 'base64';
      const uploadPdf=()=>{
       
        try{
          const data=JSON.stringify({
            T_id:"T123",
            ClassID:1,
            LessonNo:lessonNo,
            ss:Assignment,
            AssignmentName:filedata.name,
            DatabaseName:SelectedDatabase
          })
          console.debug(data)

        fetch('http://192.168.10.6/backend/api/Teacher/PostAssignment', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json()) 
      .then(json => {
        console.log(json);
        alert(json)
      })
    }catch(e){

      console.log(e)
    }
     
    
      }
 return(
  <View style={styles.container}>

<View style={{display:'flex',width:'90%'}}>
<View >
            <Text style={{fontSize:24,color:'#fb5b5a'}}>Select the Database</Text>
          <Picker style={styles.dataBasePiker}
      dropdownIconColor="#21130d" 
      mode="dropdown"
  selectedValue={SelectedDatabase}
  onValueChange={((itemValue, itemIndex)=>{
    setSelectedDatabase(itemValue)
  }
  )
  }>
    {
      Database.map(data=>{
        return(  <Picker.Item key={data} label={data} value={data} />)
      })
    }

 
</Picker>
</View>
</View>

      <View style={styles.classStyle}>
          <View>
              <Text style={{fontSize:24,color:'#fb5b5a',}}>Select Lesson </Text>
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

      </View>
      <View style={styles.FileView}>
          <Text style={{fontSize:24,color:'#fb5b5a',}}> Select File </Text>
          
         <TouchableOpacity  style={styles.btn1} onPress={selectFile}>
           <Text style={styles.btntext}>Select File</Text>
           </TouchableOpacity>
       
          <View style={styles.preView}>
              <Text style={{fontSize:18}}>{
                  filedata!==null ?filedata.name :null
                  }</Text>
              {
                  Assignment!==null ? <PDFView
                  fadeInDuration={250.0}
                  style={{ flex: 1 }}
                  resource={Assignment}
                  resourceType={resourceType}
                  onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                  onError={(error) => console.log('Cannot render PDF', error)}
                /> :null
              }

          </View>
          <View style={{marginTop:30}}>
          <TouchableOpacity  style={styles.btn }onPress={uploadPdf}>
            <Text style={styles.btntext}> Upload Assignment </Text>
            </TouchableOpacity>
          </View>

      </View>
     
    
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
  
   justifyContent: 'center',
   alignItems: 'center',
   width:'100%',
  
   flexDirection:'column'
  },
assignmentTitle:  {
    display:'flex',
  
    width:'90%'
  },
  DatabaseView:{
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
 title: {
     fontSize:24,
     padding: 15,
     color:'#fb5b5a',

      
  },
  inputView: {
    borderBottomWidth:1,
      width: "100%",
      height: 45,
      marginBottom: 50,
      alignItems: 'center',
      color:'black'
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
classStyle:{
    display:'flex',
    width:'90%'
},
dataBasePiker:{
    borderWidth:1,
    fontSize:20,
    marginLeft:15,
    borderColor:'black',
    color:'black',
    width:'90%'
  },
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
export default UploadAssignment