import React,{useState,useEffect}from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Switch,Modal
  } from "react-native";
  import IpAddress from '../../../Enviornment/Ipconfig'
  import CheckBox from '@react-native-community/checkbox'
  import {Picker} from '@react-native-picker/picker'
  import PDFView from 'react-native-view-pdf'
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'

  const serverList=[{
    ServerName:"MALIKKALEEM\SQLEXPRESS01"
  },
  {
    ServerName:'MALIKKALEEM\SQLEXPRESS01'
  }
  ]

  const JoinsTypes=[{
    JoinName:"Inner JOIN"
  },
{
  JoinName:"Right Join" }
,{
  JoinName:"Left Join"
},{
JoinName:"Full Outer Join"
}
]
  const Joins=(props)=>{
    const resourceType = 'base64';
    const[Database,setDatabase]=useState([])
    const[SelectedDatabase,setSelectedDatabase]=useState()
    const [TableName,setTableName]=useState([])
    const[SelectedTable,setSelecteTable]=useState(null)
    const[SelectedTable2,setSelectedTable2]=useState()
    const [ColumnName,setCoulumnName]=useState([])
    const [ColumnName2,setCoulumnName2]=useState([])
    const [QueryType,setQueryType]=useState('Select')
    const [QColum,setQColum]=useState('')
    const[isJoin,setIsJoin]=useState(true)

    
    const [showModal, setShowModal] = useState(false);

    const [inputModel,setInputModel]=useState(false);
    const [result,setResult]=useState([])

    const [query,setQuery]=useState()
  
    const [getSavedQuery,setGetSavedQuery]=useState([])
    const [Query_Name,setQuery_Name]=useState()

    const [OnJoinColum,setOnJoinColum]=useState()
    const [jointype,setJoinType]=useState(null);

    ///////////////////////////////////////
    const [Assigment,setAssignment]=useState(null)
    const [AssignmentModel,setAssignmentModel]=useState(false)
    const [SubmitAssignmentModel,setSubmitAssignmentModel]=useState(false)
    const [StudentAssignment,setStudentAssignment]=useState(null)
    const [filedata,setFileData]=useState(null)

    //////////////////////////

    const getAssignment=()=>{
      const LessonNo=1;
      //props.route.params.Lesson

      console.log('lesson =',LessonNo)
      try{
fetch(`http://${IpAddress}/backend/api/Teacher/Get?AssignmentNO=${LessonNo}`)
.then(res=>res.json())
.then((res)=>{
  console.log(res)
    setAssignment(res)
  })
}catch(e){
  console.debug(e.AssignmentName)
}
    }

const StUpload=()=>{
  console.log('ggg',StudentAssignment)
  try{
    const data=JSON.stringify({
      UserName:"17-arid-3460",
      ClassID:1,
      AssignmentID:26,
      base64:StudentAssignment,
    })
    console.debug(data)

  fetch('http://192.168.1.18/backend/api/Student/PostAssignment', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: data
}).then(response => response.json()) 
.then(json => {
console.log(json)
  alert(json)
})
}catch(e){

console.log(e)
}


}  
    const selectFile =async()=>{
      try{
          const res =await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],

          }) 
          setFileData(res)
          RNFetchBlob.fs.readFile(res.uri,'base64').then(
              (data)=>{
setStudentAssignment(data)
              }
          )
      }catch(e){
          console.log(e)
      }
  }
  ////////////////////////////////////
    useEffect(() => {
      getAssignment();
      fetch(`http://${IpAddress}/backend/api/values/GetDatabase`)
      .then(res=>res.json())
      .then((data)=>{
          setDatabase(data)
          console.log(data);
      });            
    }, []);

    
   const GetTabeName=(item)=>{
     const database=item.itemValue
    fetch(`http://${IpAddress}/backend/api/values/gettable?TableName=${database}`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        setTableName(data)   
       
    });
    }
   
const GetColumnNames=(da)=>{
console.log('table name name',da.itemValue)
const data=da.itemValue
      fetch(`http://${IpAddress}/backend/api/values/GetTableColumn?table=${data}&DatabaseName=${SelectedDatabase}`)
.then(res=>res.json())
.then((data)=>{
    //console.log(data)
    setCoulumnName(data)
});
    }

    const GetColumnNames2=(da)=>{
      console.log('table name name',da.itemValue)
      const data=da.itemValue
            fetch(`http://${IpAddress}/backend/api/values/GetTableColumn?table=${data}&DatabaseName=${SelectedDatabase}`)
      .then(res=>res.json())
      .then((data)=>{
         // console.log(data)
          setCoulumnName2(data)
      });
          }

 const co=()=>{
  let a='';
  let joinColum='';

  if(!isJoin){
  ColumnName.forEach(element => {
    if(element.isChecked==true){
      
        console.log(element.id,element.column)
         a=a+element.column+','
      
    }
    
});
  }
  if(isJoin){
    console.log('oooooooooooooo',OnJoinColum)
    ColumnName.forEach(element => {
      if(element.isChecked==true){
        
          console.log(element.id,element.column)
           a=a+SelectedTable+'.'+element.column+','
        
      }
      
  });
    ColumnName2.forEach(element => {
      if(element.isChecked==true){
        
          console.log(element.id,element.column)
           joinColum=joinColum+SelectedTable2+'.'+element.column+','
           
      }
      console.log('ssssssss',joinColum)
     
  });
  a=a+joinColum
  }

 
  console.log(a)
  console.log(a.length)
  let v=''
  for(let i=0;i<a.length-1;i++){
    v=v+a[i]
  }
  
  
setQColum(v);
 }

 const ShowQuery=()=>{
  let query
   if(QueryType==='Select'){
     if(isJoin){
       query='Select'+' '+QColum+' '+' from '+SelectedTable+' '+jointype+ ' '+SelectedTable2+' '+' on '+SelectedTable+'.'+OnJoinColum+ ' = '+SelectedTable2+'.'+OnJoinColum;
       console.log(query)
      }
     if(!isJoin){
       if(!isEnabled){
        query= QueryType +' '+QColum+' '+'from'+' '+SelectedTable
       }
       if(isEnabled){
     query= QueryType +' '+QColum+' '+'from'+' '+SelectedTable+' where '+WhereColumn+' '+condition+' '+conditionValue
       }
     console.log(query)
     }
    setQuery(query)
   }
   else if(QueryType=='insert'){
     let q=QueryType+'into values('+QColum+')';
     setQuery(q)
   }
   
 }

 const GetqueryFromDatabase=()=>{
   console.log('clicked')
   fetch(`http://${IpAddress}/backend/api/values/SaveQuery?UserName=17-arid-3460`)
   .then(res=>res.json())
   .then((response)=>{
     console.log(response)
     setGetSavedQuery(response)
   }).catch((error)=>console.log('erroe',error))
 }

 const PostSavedQuery=()=>{
   console.log('post')

  fetch(`http://${IpAddress}/backend/api/Values/PostQuery`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      UserName: "17-ardi-3461",
        Query:query,
        DatabaseName:SelectedDatabase,
        Query_Name:Query_Name
    }),
  }).then(response => response.json()) 
  .then(json => {
    console.log(json);
    alert(json)
  })
  
 }
 const Taheader=()=>{
   if(result===undefined){
     console.log('ffffffffff')
   }
   if(result.length>1){
   let d=Object.keys(result[0])
   const d1 =d.filter((item,index)=>d.indexOf(item)==index)
  return(
<View style={{borderWidth:1,flexDirection:'row',marginTop:10}}>
  {
    d1.map((i,index)=>(
      <View  key={index} style={{flexDirection:'row',display:'flex',marginRight:10}}>
        <Text > {i}</Text>
      </View>
       
    )
      )}
</View>
  )
  }
}

    return(

        <View style={{flex:1,backgroundColor:'#fff'}}>     
          <ScrollView style={{position:'relative'}}>
          <View  >
            <Text style={styles.syntax} >    Introduction  </Text>
            <View>
              <Text style={styles.intro}>
              SQL joins are used to query data from two or more tables, based on a relationship between certain columns in these tables
              {"\n"}
              </Text>
              <Text style={styles.syntax}>
              Different Types of SQL JOINs
              {"\n"}
              </Text>
              
              <Text >   1: (INNER) JOIN: Returns records that have matching values in both tables {"\n"}</Text>
              
               <Text>   2: LEFT (OUTER) JOIN: Return all records from the left table, and the matched records from the right table {"\n"} </Text>
               <Text>   3:  RIGHT (OUTER) JOIN: Return all records from the right table, and the matched records from the left table {"\n"}</Text>
               
               <Text>   4: FULL (OUTER) JOIN: Return all records when there is a match in either left or right table
              </Text>
              </View>
              <View style = {{ width:'99%', height:250,display:'flex',borderWidth:0.5,overflow:'hidden',marginBottom:10,marginTop:10}}>
                    <Image source={require("../../../assets/Examples/TJoin.png")}  resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
              
              <Text style={styles.syntax}>
              SQL Aggregate function  Syntax
              </Text>
              <Text style={{fontSize:17,marginTop:10}}>
                      SELECT column_name(s) FROM table_name1 [Join Type] table_name2 ON table_name1.column_name=table_name2.column_name
              </Text>
              </View>
               {/* <---------------------------Examples---------------------->              */}
               <View>
                <View>
                  <Text style={styles.syntax}> Examples</Text>
                </View>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Join1.png")}  resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Join2.png")} resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Join3.png")} resizeMode='contain' style={{width:'100%',height:250}}/>
                  </View>

                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Join4.png")} resizeMode='contain' style={{width:'100%',height:250}}/>
                  </View>
                </View>
                </View>
                <View>
            <Text style={styles.heading1}> Let's  Practice</Text>
            </View>

            <View style={styles.DatabaseView}>
            <Text style={styles.heading1}>Select Server Name</Text>
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
            <View style={styles.DatabaseView}>
            <Text style={styles.heading1}>Select the Database</Text>
          <Picker style={styles.dataBasePiker}
      dropdownIconColor="#21130d" 
      mode="dropdown"
  selectedValue={SelectedDatabase}
  onValueChange={((itemValue, itemIndex)=>{
    setSelectedDatabase(itemValue)
    GetTabeName({itemValue})
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

{/*  Select table View    */}
<View style={styles.TableView} >

<Text style={styles.heading1}>Select Table Name </Text>
<Picker style={styles.dataBasePiker}
 dropdownIconColor="#21130d" 
 mode="dropdown"
  selectedValue={SelectedTable}
  onValueChange={((itemValue, itemIndex)=>{
    setSelecteTable(itemValue)
    GetColumnNames({itemValue})
  }
  )
  }>
    {
      TableName.map(data=>{
        return(  <Picker.Item key={data} label={data} value={data} />)
      })
    }

 
</Picker>
</View>

<View > 
<Text style={styles.heading1}>Select column's </Text>
  {
    ColumnName.length>=1?
    ColumnName.map(data=>{
     // console.log(data)
      return(
        <View key={data.id} style={styles.ColumView}>
          <CheckBox 
          value={data.isChecked}
        onValueChange={e=>{
          setCoulumnName(ColumnName.map(d=>{
            if(d.id==data.id){
              d.isChecked=!data.isChecked
            }
            return d;
          }))
          co()
        }
        
      }
          />
          <Text>{data.column}</Text>
          </View>
      )
    }):null
  }
  </View>
  <View>
    <View>
    <Text style={styles.heading1}> Join Type  </Text>
    </View>
    <View>
    <Picker style={styles.dataBasePiker}
             dropdownIconColor="#21130d" 
             mode="dropdown"
            selectedValue={jointype}
            onValueChange={((itemValue, itemIndex)=>{
              setJoinType(itemValue)
            }
            )
            }
            >
            {
              JoinsTypes.map((data,i)=>{
                return(
                  <Picker.Item key={i} label={data.JoinName} value={data.JoinName}/>
                )
              })
            }

            </Picker>
    </View>

  </View>
  {/*      Second Table for join                             */}
  <View>
      <View>
        {
          isJoin?<View>
            <View style={styles.TableView} >

<Text style={styles.heading1}>Select Table Name </Text>
<Picker style={styles.dataBasePiker}
 dropdownIconColor="#21130d" 
 mode="dropdown"
  selectedValue={SelectedTable}
  onValueChange={((itemValue, itemIndex)=>{
    setSelectedTable2(itemValue)
    GetColumnNames2({itemValue})
  }
  )
  }>
    {
      TableName.map(data=>{
        return(  <Picker.Item key={data} label={data} value={data} />)
      })
    }

 
</Picker>
</View>
<View > 
  {
    
    ColumnName2.map((data,index)=>{
      //console.log(data)
      return(
        <View key={index} style={styles.ColumView}>
          <CheckBox 
          value={data.isChecked}
        onValueChange={e=>{
          setCoulumnName2(ColumnName2.map(d=>{
            if(d.id==data.id){
              d.isChecked=!data.isChecked
            }
            return d;
          }))
co();
        }}
          />
          <Text>{data.column}</Text>
          </View>
      )
    })
  }
  </View>
  <View>
    <View>
    <Text style={styles.heading1}>Select Colum  for On Join </Text>
    </View>
    <Picker style={styles.dataBasePiker}
 dropdownIconColor="#21130d" 
 mode="dropdown"
  selectedValue={OnJoinColum}
  onValueChange={((itemValue, itemIndex)=>{
    setOnJoinColum(itemValue)
  }
  )
  }
  >
    {
      ColumnName2.map(data=>{
        return(  <Picker.Item key={data.id} label={data.column} value={data.column} />)
      })
    }    
    </Picker>

    </View>

          </View>
          :null
        }

      </View>
  </View>
 


<View style={{height:150,marginTop:20,justifyContent:'center'}}>
<Button onPress={() => {
          ShowQuery()
            setShowModal(!showModal);
          }} title="Execute "
  color="#fb5b5a"
  accessibilityLabel="Learn more about this purple button"/> 


  </View>
   {/* //////////////////////////////Show Assignment /////////////////////////// */}
   <View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',height:200}}>
    <View style={styles.AssignmentView} >
      <Text style={styles.syntax}> Assignment From Lesson   </Text>
    </View>
    <View style={styles.AssignmentTitle}>
      <TouchableOpacity >
        { Assigment!==null ?
        <Text style={{color:'blue',fontSize:22}} onPress={()=>setAssignmentModel(!AssignmentModel)}> {Assigment.AssignmentName}</Text>:null
  }
      </TouchableOpacity>
    </View>
    <View style={styles.SubmitBtn}>
    <Button onPress={() =>setSubmitAssignmentModel(!SubmitAssignmentModel)}
  color="#fb5b5a"
  title="Submit Assignment"
  accessibilityLabel="Submit"/> 

    </View>


  </View>
          </ScrollView>

          {/* {
            Object.keys(result).map(key=>{
              console.log('keu',key)
              return(<Text> {result[key]}</Text>)
            })
          } */}
<Modal
          animationType={'slide'}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modal}>
          <View>
            <View style={{marginTop:10,marginBottom:10}}>
              <Text>{query}</Text>
            </View>
  <Button 
  onPress={()=>{
    setShowModal(!showModal);
    props.navigation.navigate('ExQuery',{
      Query:query,
      database:SelectedDatabase
     } )
  }
} title="Execute Query"
  color="#fb5b5a"
  accessibilityLabel="Learn more about this purple button"/> 
          
           { Taheader()}
          { 
          result.length>1 ?
            result.map((m,i)=>{
              
                return(
                  <View key={i} style={{flexDirection:'row'}} >{
                  Object.keys(m).map((i,index)=>(
                  <View  key={index} style={{flexDirection:'row',display:'flex',width:90}}>
                    <Text >  {m[i]}</Text>
                  </View>
                   
                )
                  )}
                  </View>
                  )
            }
         
              )
              :
              null
        }
   </View>
 
   <View style={{display:'flex',width:'100%',height:300}}>
     <View style={styles.Mbtn}>
              <Button 
              title="Edit"
              onPress={() => {
                setShowModal(!showModal);
              }}
            />
            </View>
            <View style={styles.Mbtn}>
              <Button style={{width:20}}
              title="Save Query"
              onPress={() => {
               setInputModel(!inputModel)
              }}
            />
            </View>
            <View style={styles.Mbtn}>
              <Button style={{width:20}}
              title="Show Saved query"
              onPress={() => {
               GetqueryFromDatabase()
              }}
            />
            </View>
            <View>
          {
            getSavedQuery.length>=1 ?
            getSavedQuery.map((data,index)=>{
              return(
                <View key={index} style={{height:30,display:'flex',borderWidth:1}}>
                  <TouchableOpacity
                  onPress={()=>{
                    setShowModal(!showModal);
                props.navigation.push('ExQuery',{
                  Query:data.Query,
                  database:data.DatabaseName
                })                            
                  }}
                  >
                  <Text>
                    {data.Query_Name}
                  </Text>
                  </TouchableOpacity>
                  </View>
              )
            })

            :null
          }
        </View>
            </View>
            </View>
           <Button
              title="Click To Close Modal"
              onPress={() => {
                setShowModal(!showModal);
                console.log(showModal)
                setResult('')
              }}
            /> 


           
        </Modal>
        

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={inputModel}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
<View style={{height:400,justifyContent:'center'}}>
<Text style={{fontSize:18,marginLeft:25}}>Enter Query Name </Text>
  <TextInput 
  style={{height:40,backgroundColor:'#fff',marginBottom:40,width:'80%',marginLeft:30}}
  placeholder="Enter query Name"
  value={Query_Name}
  onChangeText={(Query_Name)=>setQuery_Name(Query_Name)}
  />
<Button
              title="Save Query"
              onPress={() => {
                PostSavedQuery()
                setInputModel(!inputModel);
                
              }}
            />
</View>

          </Modal>

 {/* ////////////////////////////////////Assignent Model ///////////////////////// */}



 <Modal 
          animationType={'slide'}
          transparent={false}
          visible={AssignmentModel}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            <View style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1}}>
            { Assigment!==null ?
     <View style={styles.AssignmentmodalView}>
            <Text style={styles.heading1}>{Assigment.AssignmentName} </Text>
            <View style={{width:300,height:'90%',borderWidth:1}}>
                  <PDFView
                  fadeInDuration={250.0}
                  style={{ flex: 1 }}
                  resource={Assigment.ss}
                  resourceType={resourceType}
                  onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                  onError={(error) => console.log('Cannot render PDF', error)}
                />    
                </View> 
</View>:null
  }
<Button title="download " onPress={()=>setAssignmentModel(false)} />
</View>

          </Modal>
{/*      Submit    Assignment     Model */}

<Modal 
animationType={'fade'}
          transparent={false}
          visible={SubmitAssignmentModel}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>

<View style={{display:'flex',alignItems:'center',flex:1,marginTop:20}}>
  <Text style={styles.syntax}> Submit Assignment </Text>
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
                  StudentAssignment!==null ? <PDFView
                  fadeInDuration={250.0}
                  style={{ flex: 1 }}
                  resource={StudentAssignment}
                  resourceType={resourceType}
                  onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                  onError={(error) => console.log('Cannot render PDF', error)}
                /> :null
              }

          </View>
          <View style={{marginTop:30}}>
          <TouchableOpacity  style={styles.btn }>
            <Text style={styles.btntext} onPress={StUpload}> Upload Assignment;s </Text>
            </TouchableOpacity>
          </View>

      </View>
</View>
<Button title="Close" onPress={()=>setSubmitAssignmentModel(false)} />
</Modal>         
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
  export default Joins;