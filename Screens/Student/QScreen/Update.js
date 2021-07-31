import React,{useEffect,useState} from 'react'
import { View, Text, StyleSheet,ScrollView,TextInput,
    TouchableOpacity,Button,Image,Modal} from 'react-native'


/**
* @author
* @function Update
**/
import CheckBox from '@react-native-community/checkbox'
import {Picker} from '@react-native-picker/picker'
import IpAddress from '../../../Enviornment/Ipconfig'
import PDFView from 'react-native-view-pdf'
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'
const Update = (props) => {
    const [inputs, setInputs] = useState([]);
    const[Database,setDatabase]=useState([])
    const[SelectedDatabase,setSelectedDatabase]=useState()
    const [TableName,setTableName]=useState([])
    const[SelectedTable,setSelecteTable]=useState()
    const [ColumnName,setCoulumnName]=useState([])
    const [QueryType,setQueryType]=useState('Select')
    const [QColum,setQColum]=useState('')
    const [showModal, setShowModal] = useState(false);
    const [inputModel,setInputModel]=useState(false);
    const [query,setQuery]=useState()
    const [getSavedQuery,setGetSavedQuery]=useState([])
    const [Query_Name,setQuery_Name]=useState()

    const [Assigment,setAssignment]=useState(null)
    const [AssignmentModel,setAssignmentModel]=useState(false)
    const [SubmitAssignmentModel,setSubmitAssignmentModel]=useState(false)
    const [StudentAssignment,setStudentAssignment]=useState(null)
    const [filedata,setFileData]=useState(null)

    const [OnJoinColum,setOnJoinColum]=useState()

    const [isShowInputText,SetisShowInputText]=useState(false);

    const [CValue,setCValue]=useState();
    const[ComparisonOperator,setComparisonOperator]=useState();

    const getAssignment=()=>{
        const LessonNo=1;
  
        console.log('lesson =',LessonNo)
        try{
  fetch(`http://${IpAddress}/backend/api/Teacher/Get?AssignmentNO=${LessonNo}`)
  .then(res=>res.json())
  .then((res)=>{
      setAssignment(res)
    })
  }catch(e){
    console.debug(e.AssignmentName)
  }
      }

      useEffect(() => {
        getAssignment();
          fetch(`http://${IpAddress}/backend/api/values/GetDatabase`)
          .then(res=>res.json())
          .then((data)=>{
              setDatabase(data)
          });            
        }, 
        []);

        const GetTabeName=(item)=>{
            const database=item.itemValue
           fetch(`http://${IpAddress}/backend/api/values/gettable?TableName=${database}`)
           .then(res=>res.json())
           .then((data)=>{
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
       
       
        const co=()=>{
         let a='';
         let count=0;
         ColumnName.forEach(element => {
           if(element.isChecked==true){      
               console.log(element.id,element.column)
                a=a+element.column+','  
                count++;       
           }

  if(count!=0){
    const _inputs = [...inputs];
      for(let i=0;i!=count;i++){
          console.debug(i)
    
    _inputs.push({key: '', value: ''});
    setInputs(_inputs);
      }
  }         
           
       });
       let v=''
         for(let i=0;i<a.length-1;i++){
           v=v+a[i]
         }
         
         
       setQColum(v);
     
         }
         
        const ShowQuery=()=>{
let updatequery="";
let updatequery1="";
var Col=QColum.split(',')
        console.debug(inputs[0].value)
        for(let a=0;a!=Col.length;a++){
            updatequery=updatequery+Col[a]+" = "+inputs[a].value+","
        }
        for(let a=0;a!=updatequery.length-1;a++){
            updatequery1=updatequery1+updatequery[a];
        }
         let query= " set "+updatequery1+" where "+OnJoinColum+" "+ComparisonOperator+" "+CValue;
         console.log(query)
         setQuery(query)
          
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

    const addHandler = ()=>{
      const _inputs = [...inputs];
      _inputs.push({key: '', value: ''});
      setInputs(_inputs);
    }
    
    const deleteHandler = (key)=>{
      const _inputs = inputs.filter((input,index) => index != key);
      setInputs(_inputs);
    }
  
    const inputHandler = (text, key)=>{
      const _inputs = [...inputs];
      _inputs[key].value = text;
      _inputs[key].key   = key;
      setInputs(_inputs);
      
    }
  
    const getValue=()=>{
        var Col=QColum.split(',')
        console.debug(inputs[0].value)
        for(let a=0;a!=Col.length;a++){
            console.log(Col[a]+" "+inputs[a].value)
        }
        inputs.forEach(element => {
            console.log(element)
        });
    }
    const showInputText=()=>{
        return(
            <View>
                <ScrollView style={styles.inputsContainer}>
        {inputs.map((input, key)=>(
          <View key={key} style={styles.inputContainer}>
            <TextInput placeholder={(key+1).toString()} value={input.value}  onChangeText={(text)=>inputHandler(text,key)}/>
            <TouchableOpacity onPress = {()=> deleteHandler(key)}>
              <Text style={{color: "red", fontSize: 13}}>Delete</Text>
            </TouchableOpacity> 
          </View>
        ))}
        </ScrollView>
            </View>
        )
    }
    const resourceType = 'base64';
    return (
      <View style={styles.container}>
          <ScrollView style={{position:'relative'}}>
            <View style={{marginTop:10}}>
              <Text style={styles.intro}>
              The SELECT statement is used to select data 
              from a database.
              {"\n"}
              </Text>
              
              <Text style={styles.syntax}>
                  Syntax of Select Statement
              </Text>
              <Text>
              SELECT column_name(s) FROM table_name
              </Text>
              </View>

               {/* <---------------------------Examples---------------------->              */}
               <View>
                <View>
                  <Text style={styles.syntax}> Examples</Text>
                </View>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Select1.jpg")}  resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Select2.jpg")} resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Select3.jpg")} resizeMode='contain' style={{width:'100%',height:250}}/>
                  </View>
                </View>
              </View>
              <View>
            <Text style={styles.heading1}> Let's  Practice</Text>
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
         
        }
      
      }
          />
          <Text>{data.column}</Text>
          </View>
      )
    }):null
  }
  </View>
  {
        isShowInputText?
        showInputText()
        :
        null
    }
  <View>
    <View>
    <Text style={styles.heading1}>Select Colum  for Update  </Text>
    </View>
    <Picker style={styles.dataBasePiker}
 dropdownIconColor="#21130d" 
 mode="dropdown"
  selectedValue={OnJoinColum}
  onValueChange={((itemValue, itemIndex)=>{
    setOnJoinColum(itemValue)
    co()
    SetisShowInputText(true)
  }
  )
  }
  >
    {
      ColumnName.map(data=>{
        return(  <Picker.Item key={data.id} label={data.column} value={data.column} />)
      })
    }    
    </Picker>

    </View>
    <View>
    <View>
          <Text style={styles.heading1}>Select Comparison Operator</Text>
      </View>
      <View>
      <Picker selectedValue={ComparisonOperator} 
    style={styles.dataBasePiker}
    onValueChange={(item,index)=>{
      setComparisonOperator(item)
    }}>
      <Picker.Item label=">=" value=">=" />
      <Picker.Item label="<=" value="<="/>
      <Picker.Item label="<>" value="<>"/>
      <Picker.Item label=">" value=">" />
      <Picker.Item label="<" value="<"/>
      <Picker.Item label="=" value="="/>
    </Picker>
      </View>

  </View>

    <View>
      <View>
      <Text style={styles.heading1}>Enter condition   </Text>
      </View>
      <View>
<TextInput style={styles.TextInput}
placeholder="enter value"
value={CValue}
onChangeText={(CValue)=>setCValue(CValue)}
/>
      </View>
    </View>
    

 

<View style={{height:60,marginTop:10,justifyContent:'center'}}>
<Button onPress={() => {
          ShowQuery()
    setShowModal(!showModal);
          }} title="Execute "
  color="#fb5b5a"
  accessibilityLabel="Learn more about this purple button"/> 


  </View>
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
        <View>
            {/* //////////////////////////////Show Assignment /////////////////////////// */}
 

{/* ---------------modal---------------- */}

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
    props.navigation.navigate('UpdateExQuery',{
      Query:query,
      AssignmentID:Assigment.AssignmentID,
      lessonNo:1,
      DatabaseName:SelectedDatabase,
      TableName:SelectedTable,
     } )
  }
} title="Execute Query"
  color="#fb5b5a"
  accessibilityLabel="Learn more about this purple button"/> 
                   
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
              title="Show Saved qery"
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
                //setResult('')
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
            <Text>{Assigment.AssignmentName} </Text>
            <View style={{width:'100%',height:'100%'}}>
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

{/* <Modal 
animationType={'fade'}
          transparent={false}
          visible={SubmitAssignmentModel}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>

<View style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1}}>
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
</Modal> */}
        </View>
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white'
    },
    inputsContainer: {
      flex: 1, marginBottom: 20
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: "lightgray"
    },
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

export default Update