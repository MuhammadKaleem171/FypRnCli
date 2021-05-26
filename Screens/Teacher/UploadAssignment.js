import React,{useState}from 'react'
import { View, Text, StyleSheet,TextInput, Button} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'
import PDFView from 'react-native-view-pdf'


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
    const [Assignment,setAssignment]=useState(null)
    const [filedata,setFileData]=useState(null)
    console.debug(props)
    const resources = {
        file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : 'content://com.android.providers.downloads.documents/document/4377',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        base64: 'v1Vo19pmSWup3hmztzo0FQ4HPDbi1Zq876nhxNybpdLhyVPbn3tdMTWMiFLsJa87vJMRu/1dgzLOXO3iFtGKQ/lEoX3dfh/8tPZkqRmrBbhYecry+wctS'
      }
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
 return(
  <View style={styles.container}>

      <View  style={styles.assignmentTitle}>
      <Text style={styles.title}>Assigment Title</Text>

<View style={styles.inputView}>
<TextInput
style={styles.TextInput}
placeholder="Enter Assignment Title"

/>
</View>
      </View>

      <View style={styles.classStyle}>
          <View>
              <Text style={{fontSize:24,color:'#fb5b5a',}}>Select Class </Text>
          <Picker style={styles.dataBasePiker}
             dropdownIconColor="#21130d" 
             mode="dropdown"
            selectedValue={"MALIKKALEEM\SQLEXPRESS01"}
            >
            {
              serverList.map((data,i)=>{
                return(
                  <Picker.Item key={i} label={data.ServerName} value={data.ServerName}/>
                )
              })
            }

            </Picker>
          </View>

      </View>
      <View style={styles.FileView}>
          <Text style={{fontSize:24,color:'#fb5b5a',}}> Select File </Text>
          <View style={styles.fileUpload}>
<Button title="Select File "  onPress={selectFile}/>
          </View>
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
          <View style={{marginTop:50}}>
          <Button title="Upload Assignment "  onPress={()=>console.log('hello')}/>
          </View>

      </View>
    
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
  
   justifyContent: 'center',
   alignItems: 'center',
   width:'100%'
  },
assignmentTitle:  {
    display:'flex',
  
    width:'90%'
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
  }


})
export default UploadAssignment