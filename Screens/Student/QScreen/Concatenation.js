
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

const Concatenation=(props)=>{

    const ArithExpression=[{
        id:1,
        Ex:'+' 
     },{
   id:2,
   Ex:'-'
     },
     {
       id:3,
       Ex:'*'
         },
         {
           id:4,
           Ex:'/'
             }
     ]

    const[Database,setDatabase]=useState([])
    const[SelectedDatabase,setSelectedDatabase]=useState(' ')
    const [TableName,setTableName]=useState([' '])
    const[SelectedTable,setSelecteTable]=useState()
    const [ColumnName,setCoulumnName]=useState([])
    const [QueryType,setQueryType]=useState('Select')
    const [QColum,setQColum]=useState('')
    const [showModal, setShowModal] = useState(false);
    const [inputModel,setInputModel]=useState(false);
    const [query,setQuery]=useState()
    const [getSavedQuery,setGetSavedQuery]=useState([])
    const [Query_Name,setQuery_Name]=useState()

    const [FColumn,setFColumn]=useState('')
    const [secColumn,setSecColumn]=useState('')
    const [AliasName,setAliasName]=useState('')
    const [ArithmeticValue,setArithmeticValue]=useState()



    // -----------------Function ----------

    useEffect(() => {
        fetch('http://192.168.1.18/backend/api/values/GetDatabase')
        .then(res=>res.json())
        .then((data)=>{
            setDatabase(data)
            console.log(data);
        });            
      }, []);
  
      
     const GetTabeName=(item)=>{
         if(SelectedDatabase!==' '){
       const database=item.itemValue
      fetch(`http://192.168.1.18/backend/api/values/gettable?TableName=${database}`)
      .then(res=>res.json())
      .then((data)=>{
          console.log(data)
          setTableName(data)   
         
      });
    }

      }
     
  const GetColumnNames=(da)=>{
  console.log('table name name',da.itemValue)
  const data=da.itemValue
        fetch(`http://192.168.1.18/backend/api/values/GetTableColumn?table=${data}&DatabaseName=${SelectedDatabase}`)
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
    let query;
     // query='select '+' '+FColumn+ `'+ '`+`' '`+' +' +secColumn+' '+' As '+' '+AliasName+' '+'from '+SelectedTable
    

      let q='Select' +' '+FColumn+ ' '+'%2B' +'  '+secColumn+' As '+'  '+'['+AliasName+']'+' '+'from'+' '+SelectedTable
    console.log(q)
    setQuery(q)
     
   }
  
   const GetqueryFromDatabase=()=>{
     console.log('clicked')
     fetch(`http://192.168.1.18/backend/api/values/SaveQuery?UserName=17-arid-3460`)
     .then(res=>res.json())
     .then((response)=>{
       console.log(response)
       setGetSavedQuery(response)
     }).catch((error)=>console.log('erroe',error))
   }
  
   const PostSavedQuery=()=>{
     console.log('post')
  
    fetch('http://192.168.1.18/backend/api/Values/PostQuery', {
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
    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>     
        <ScrollView style={{position:'relative'}}>
            <View style={{marginTop:10}}>
              <Text style={styles.intro}>
              Concatenation Operator (+)
              {"\n"}
              </Text>
              
              <Text style={styles.syntax}>
                  Syntax of   Concatenation Operator (+)
              </Text>
              <Text style={{marginTop:10,fontSize:16}}>
              Select [CoulumName  ] + ’ ‘ +[ColumnName] as [ Alias Name] from Table Name;
              </Text>
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
      onPress={()=>console.log('magic')}
      onTouchStart={()=>console.log('magic     start')}
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
        return(  
            <Picker.Item key={data} label={data} value={data} />)
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
        SelectedDatabase!==' '?
      TableName.map(data=>{
        return(  <Picker.Item key={data} label={data} value={data} />)
      })
    :null
    }

 
</Picker>
</View>

{/* <View > 
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
  </View> */}

{/* --------------------------Select Arithmetic Expressions ----------------------- */}

  <View>
      <View>
      <Text style={styles.heading1}> Select 1st  Column  </Text>
      </View>
      <View>
          <Picker 
          style={styles.dataBasePiker}
          dropdownIconColor="#21130d" 
          mode="dropdown"
          selectedValue={FColumn}
          onValueChange={(item)=>{
              setFColumn(item)
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
      <View>
      <View>
      <Text style={styles.heading1}> Select 2nd  Column  </Text>
      </View>
      <View>
          <Picker 
          style={styles.dataBasePiker}
          dropdownIconColor="#21130d" 
          mode="dropdown"
          selectedValue={secColumn}
          onValueChange={(item)=>{
              setSecColumn(item)
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
      </View>

<View>

<View>
      <Text style={styles.heading1}>  Alias  </Text>
</View>
<View>
    <TextInput  
    value={AliasName}
    placeholder="[Alias Name]"
    onChangeText={AliasName=>setAliasName(AliasName)}
    style={{borderWidth:0.5,height:40,width:'60%',justifyContent:'center',alignContent:'center',alignSelf:'center'}}

    />

</View>
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
export  default Concatenation;