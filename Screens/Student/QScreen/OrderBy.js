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

  const OderType=[{
    type:'DESC'
  },
{
  type:'ASC'
}]
const OrderBy=(props)=>{
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
// <------------------------------------------this Screen-------------------------->
    const [OrderBy,setOrderBy]=useState(false)
    const [WhereClause,setWhereClause]=useState(false)
    const [OrderByColumn,setOrderByColum]=useState('')

    const [OrderByType,setOrderByType]=useState('')
    const[WhereColumn,setWhereColumn]=useState('')
    const[condition,setCondition]=useState()
    const [conditionValue,setConditionValue]=useState()
    // -----------------Function ----------

    useEffect(() => {
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
  let query=""
   if(OrderBy){
   query=QueryType +' '+QColum+' '+'from'+' '+SelectedTable+' Order by '+OrderByColumn +' '+OrderByType
   }
   else if(WhereClause){
    query=QueryType +' '+QColum+' '+'from'+' '+SelectedTable+' Where '+WhereColumn +' '+condition +' '+conditionValue

   }
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

    const OderBYF = () => setOrderBy(previousState => !previousState);
    const WhereClauseF = () => setWhereClause(previousState => !previousState);

    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView>
              {/* <-------------------------- Order by ------------------------> */}
            <View style={{marginTop:10}}>
              <Text style={styles.intro}>
              The ORDER BY keyword is used to sort the result-set by a specified column.
              {"\n"}
              </Text>
              
              <Text style={styles.syntax}>
              SQL ORDER BY Syntax
              </Text>
              <Text>
              SELECT column_name(s) FROM table_name ORDER BY column_name(s) ASC|DESC
              </Text>
              </View>
              {/* <---------------------------Examples---------------------->              */}
              <View>
                <View>
                  <Text style={styles.syntax}> Examples</Text>
                </View>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Order1.png")}  resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Order2.png")} resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
                  
                </View>
              </View>
{/* <--------------------------------------------------Where clause -----------------------> */}
<View style={{marginTop:10}}>
              <Text style={styles.intro}>
              The WHERE clause is used to filter records.
              {"\n"}
              </Text>
              
              <Text style={styles.syntax}>
              SQL WHERE Syntax
              </Text>
              <Text>
              SELECT column_name(s)FROM table_name WHERE column_name operator value
              </Text>
              </View>
              {/* <---------------------------Examples---------------------->              */}
              <View>
                <View>
                  <Text style={styles.syntax}> Examples</Text>
                </View>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Where1.png")}  resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
                  <View style = {{ width:'100%', height:250,display:'flex',borderWidth:1,overflow:'hidden',marginBottom:10}}>
                    <Image source={require("../../../assets/Examples/Where2.png")} resizeMode='contain' style={{width:'100%',height:250}} />
                  </View>
                 
                </View>
              </View>




            <View style={{flex:1,flexDirection:'row',marginTop:10,justifyContent:"space-evenly"}}>
            <View  style={{display:'flex',flexDirection:'row',height:60,marginLeft:10}}>
    <View>
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={OrderBy? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={OderBYF}
        value={OrderBy}
      />
      </View>
      <View style={{marginLeft:10}} >
      <Text style={{fontSize:18,color:'black'}}> Order By</Text>
      </View>
      </View>

      <View  style={{display:'flex',flexDirection:'row',height:60}}>
          <View>
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={WhereClause ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={WhereClauseF}
        value={WhereClause}
      />
      </View>
      <View style={{marginLeft:10}}>
      <Text style={{fontSize:18,color:'black'}}> Where </Text>
      </View>
      </View>

            </View>
    {/* <--------------------------------------order BY -------------------------->         */}
    
    {OrderBy?
<View>
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
  <Text style={styles.heading1}>Select Column for Sorting </Text>
  </View>
  <View>
          <Picker 
          style={styles.dataBasePiker}
          dropdownIconColor="#21130d" 
          mode="dropdown"
          selectedValue={OrderByColumn}
          onValueChange={(item)=>{
              setOrderByColum(item)
              console.log('clicked',item)
            }}
          >
          {
              
             ColumnName.map((data,index)=>{
              return(  <Picker.Item  key={data.id} label={data.column} value={data.column}/>)
              })
          }
          </Picker>
      </View>

  </View>

  {/* <-------------------------Order By Type------------------------> */}
  <View>
      <View>
          
          <Text style={styles.heading1}>Order By Type </Text>
          
      </View>
      <View>
      <Picker style={styles.dataBasePiker}
             dropdownIconColor="#21130d" 
             mode="dropdown"
            selectedValue={OrderByType}
            onValueChange={OrderByType=>setOrderByType(OrderByType)}
            >
            {
              OderType.map((data,i)=>{
                return(
                  <Picker.Item key={i} label={data.type} value={data.type}/>
                )
              })
            }

            </Picker>
          
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
    </View>

    :null
}

<View>
    {WhereClause ?
  <View>
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
  
    {/* <-------------------------Where condition handle------------------------> */}
    <View>
        <View>
            
            <Text style={styles.heading1}>Select Column For Condition </Text>
            
        </View>
        <Picker style={styles.dataBasePiker}
  selectedValue={WhereColumn}
  onValueChange={((itemValue, itemIndex)=>{
    console.log(itemValue)
    setWhereColumn(itemValue)
  }
  )
  }>
    { 
      ColumnName.map((item,id)=>{
        return(  <Picker.Item  key={item.id} label={item.column} value={item.column} />)
      })
    }
</Picker>
<Text style={styles.heading1}> Select Condition</Text>
<Picker selectedValue={condition} 
    style={styles.dataBasePiker}
    onValueChange={(item,index)=>{
      setCondition(item)
      console.log(item)
    }}>
      <Picker.Item label=">" value=">" />
      <Picker.Item label="<" value="<"/>
      <Picker.Item label="=" value="="/>
    </Picker>
  <View>
  <TextInput 
    value={conditionValue}
    placeholder="enter Condition Value"
    style={styles.ColumnTextView} style={{borderWidth:1,height:40,marginLeft:15}}
    onChangeText={(condition) => setConditionValue(condition)}    />
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
      </View>
    :null
    
    }

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
        fontSize:20,
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
export  default OrderBy;