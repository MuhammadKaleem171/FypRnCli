import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,TextInput } from 'react-native'
import { Value } from 'react-native-reanimated'

import PDFView from 'react-native-view-pdf'
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'
import base64 from 'react-native-base64'


/**
* @author
* @function AddDatabase
**/
const AddDatabase = (props) => {
    const [SqlFile,SetSqlFile]=useState(null)
    const [filedata,setFileData]=useState(null)
    const[TextFile,setTextFile]=useState('')
const [A,setA]=useState('')
const { container } = styles

const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : 'content://com.android.providers.downloads.documents/document/4377',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    base64: 'v1Vo19pmSWup3hmztzo0FQ4HPDbi1Zq876nhxNybpdLhyVPbn3tdMTWMiFLsJa87vJMRu/1dgzLOXO3iFtGKQ/lEoX3dfh/8tPZkqRmrBbhYecry+wctS'
  }
  useEffect(() => {
 


  },          
    []);
  const selectFile =async()=>{
      try{
          const res =await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],

          }) 
          setFileData(res)
          console.log('res : ' + JSON.stringify(res));
          console.log('URI : ' + res.uri);
          console.log('Type : ' + res.type);
          console.log('File Name : ' + res.name);
          console.log('File Size : ' + res.size);
          RNFetchBlob.fs.readFile(res.uri,'base64').then(
              (data)=>{
var ddaa= base64.decode(data)
setTextFile(ddaa)
SetSqlFile(data)


              }
          )
          
     
      }catch(e){
          console.log(e)
      }
  }

  const Test=()=>{
      let v=''
      const a=TextFile.toString();
     for(let i=1;i<a.length-1;i++){
       v=v+a[i];
     }

     console.log(v.trim())
     setA(v.trim());
  }
 return(
  <View style={container}>
  <View>
  <TouchableOpacity  style={styles.btn1} onPress={selectFile}>
           <Text style={styles.btntext}>Select File</Text>
           </TouchableOpacity>
  </View>
  <View style={{backgroundColor:'red'}}>
    
      <TextInput placeholder=" your Sql file"
      style={{height:200}}
    multiline={true}
    onChangeText={(TextFile) => setTextFile(TextFile)}
    value={TextFile}
    numberOfLines={40}
    editable={true}
    scrollEnabled={true}
      
      />
    
  </View>
  <View>
  <TouchableOpacity  style={styles.btn1} onPress={Test}>
           <Text style={styles.btntext}>get  data</Text>
           </TouchableOpacity>
  </View>
  <Text>{A}</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,

  }
})
export default AddDatabase