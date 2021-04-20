
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
  import CheckBox from '@react-native-community/checkbox'
  import {Picker} from '@react-native-picker/picker'


  const serverList=[{
    ServerName:"MALIKKALEEM\SQLEXPRESS01"
  },
  {
    ServerName:'MALIKKALEEM\SQLEXPRESS01'
  }
  ]
  const AggregateFunction=(props)=>{


    const[Database,setDatabase]=useState([])
    const[SelectedDatabase,setSelectedDatabase]=useState()
    const [TableName,setTableName]=useState([])
    const[SelectedTable,setSelecteTable]=useState()
    const [ColumnName,setCoulumnName]=useState([{
        id:0,
        column:'select colum'

    }])
    const[SelectedColmn,setSelectedColumn]=useState('')
    const [QColum,setQColum]=useState('')
    const [showModal, setShowModal] = useState(false);
    const [inputModel,setInputModel]=useState(false);
    const [query,setQuery]=useState()
    const [getSavedQuery,setGetSavedQuery]=useState([])
    const [Query_Name,setQuery_Name]=useState()

// <---------------------------------------------- this screen------------------->
const [Agtype,setAgtype]=useState('')
    const [Alias,setAlias]=useState(false);
    const [AliasName,setAliasName]=useState('')
    const[isWhere,setIswhere]=useState(false)
    const [whereValue,setWhereValue]=useState('')
    const[whereColumn,setWhereColumn]=useState('')
    const[ComparisonOperator,setComparisonOperator]=useState('')
    // -----------------Function ----------

    useEffect(() => {
        fetch('http://192.168.10.5/backend/api/values/GetDatabase')
        .then(res=>res.json())
        .then((data)=>{
            setDatabase(data)
            console.log(data);
        });            
      }, []);
  
      
     const GetTabeName=(item)=>{
       const database=item.itemValue
      fetch(`http://192.168.10.5/backend/api/values/gettable?TableName=${database}`)
      .then(res=>res.json())
      .then((data)=>{
          console.log(data)
          setTableName(data)   
         
      });
      }
     
  const GetColumnNames=(da)=>{
  console.log('table name name',da.itemValue)
  const data=da.itemValue
        fetch(`http://192.168.10.5/backend/api/values/GetTableColumn?table=${data}&DatabaseName=${SelectedDatabase}`)
  .then(res=>res.json())
  .then((data)=>{
      //console.log(data)
      setCoulumnName(data)
  });
      }
  
  
   const co=()=>{
    let a='';
    ColumnName.forEach(element => {
      if(element.isChecked==true){      
          console.log(element.id,element.column)
           a=a+element.column+','   
      }
      
  });
  let v=''
    for(let i=0;i<a.length-1;i++){
      v=v+a[i]
    }
    
    
  setQColum(v);

    }
   
   const ShowQuery=()=>{
    let query="";
     if(Alias){
      query='Select '+' '+Agtype+'( '+SelectedColmn+' )' +' As ' + '  '+'['+AliasName+']'+'from'+' '+SelectedTable
      if(isWhere){
        query='Select '+' '+Agtype+'( '+SelectedColmn+' )' +' As ' + '  '+'['+AliasName+']'+'from'+' '+SelectedTable+' '+'Where '+whereColumn+' '+ComparisonOperator+' '+whereValue
      }
     }
     if(!Alias){
     query='Select '+' '+Agtype+'( '+SelectedColmn+' )'+' '+'from'+' '+SelectedTable
     }
    setQuery(query)
     
   }
  
   const GetqueryFromDatabase=()=>{
     console.log('clicked')
     fetch(`http://192.168.10.5/backend/api/values/SaveQuery?UserName=17-arid-3460`)
     .then(res=>res.json())
     .then((response)=>{
       console.log(response)
       setGetSavedQuery(response)
     }).catch((error)=>console.log('erroe',error))
   }
  
   const PostSavedQuery=()=>{
     console.log('post')
  
    fetch('http://192.168.10.5/backend/api/Values/PostQuery', {
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
   const Als = () => setAlias(previousState => !previousState);
   const isWhereCond = () => setIswhere(previousState => !previousState);
// <---------------------------------------------------Function end------------------------------------------->
      return(
        <View style={{flex:1,backgroundColor:'#fff'}}>     
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
<View>
      <View>
          <Text style={styles.heading1}>Select Aggregate Function</Text>
      </View>
      <View>
      <Picker selectedValue={Agtype} 
    style={styles.dataBasePiker}
    onValueChange={(item,index)=>{
      setAgtype(item)
    }}>
      <Picker.Item label=" AVG() " value="Avg" />
      <Picker.Item label=" Count() " value="Count"/>
      <Picker.Item label=" Max() " value="Max"/>
      <Picker.Item label=" MiN()" value="Min"/>
      <Picker.Item label=" Sum()" value="Sum"/>
    </Picker>
      </View>

  </View>

<View > 
<Text style={styles.heading1}>Select column for Aggregate </Text>
<View>
<Picker 
          style={styles.dataBasePiker}
          dropdownIconColor="#21130d" 
          mode="dropdown"
          selectedValue={SelectedColmn}
          onValueChange={(item)=>{
              setSelectedColumn(item)
              console.log('clicked',item)
              co()
            }}
          >
          {
             ColumnName.map((data,index)=>{
              return(  <Picker.Item  key={data.id} label={data.column} value={data.column}/>)
              })
          }
          </Picker>
          </View>

          <View  style={{display:'flex',flexDirection:'row',height:60,marginLeft:10}}>
    <View>
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={Alias? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={Als}
        value={Alias}
      />
      </View>
      <View style={{marginLeft:10}} >
      <Text style={{fontSize:18,color:'black'}}> Alias </Text>
      </View>
      </View>
      <View>
        {Alias?
        <View>
<View>
      <Text style={styles.heading1}>  Alias  </Text>
</View>
<View>
    <TextInput  
    value={AliasName}
    placeholder="[ Alias Name ]"
    onChangeText={AliasName=>setAliasName(AliasName)}
    style={{borderWidth:1}}

    />
</View>
        </View>
        :null
        }
      </View>
      <View>
      <View  style={{display:'flex',flexDirection:'row',height:60,marginLeft:10}}>
    <View>
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={Alias? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={isWhereCond}
        value={isWhere}
      />
      </View>
      <View style={{marginLeft:10}} >
      <Text style={{fontSize:18,color:'black'}}> where  </Text>
      </View>
      </View>
      </View>

      <View>
        {isWhere?
        <View>
          <View > 
<Text style={styles.heading1}>Select column for Where </Text>
</View>
<View>
<Picker 
          style={styles.dataBasePiker}
          dropdownIconColor="#21130d" 
          mode="dropdown"
          selectedValue={whereColumn}
          onValueChange={(item)=>{
              setWhereColumn(item)
              console.log('clicked',item)
              co()
            }}
          >
          {
             ColumnName.map((data,index)=>{
              return(  <Picker.Item  key={data.id} label={data.column} value={data.column}/>)
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
      <Text style={styles.heading1}>  Where Value  </Text>
</View>
<View>
    <TextInput  
    value={whereValue}
    placeholder="  enter where  value"
    onChangeText={whereValue=>setWhereValue(whereValue)}
    style={{borderWidth:1}}

    />
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
              </ScrollView>

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
    props.navigation.navigate('ExQuery',{
      Query:query,
      database:SelectedDatabase
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
  export default AggregateFunction;