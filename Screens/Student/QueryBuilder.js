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
  
  import CheckBox from '@react-native-community/checkbox'
  import {Picker} from '@react-native-picker/picker'
  const QueryBuilder=(props)=>{

    const[Database,setDatabase]=useState([])
    const[SelectedDatabase,setSelectedDatabase]=useState()
    const [TableName,setTableName]=useState([])
    const[SelectedTable,setSelecteTable]=useState()
    const [ColumnName,setCoulumnName]=useState([])
    const [QueryType,setQueryType]=useState('Select')
    const [QColum,setQColum]=useState('')
    const [isEnabled, setIsEnabled] = useState(false);

    const[WhereColumn,setWhereColumn]=useState('')
    const[condition,setCondition]=useState()
    const [conditionValue,setConditionValue]=useState()

    const [showModal, setShowModal] = useState(false);

    const [inputModel,setInputModel]=useState(false);
    const [result,setResult]=useState([])

    const [query,setQuery]=useState()
  

    useEffect(() => {
      fetch('http://192.168.10.10/backend/api/values/GetDatabase')
      .then(res=>res.json())
      .then((data)=>{
          setDatabase(data)
          console.log(data);
      });            
    }, []);

    
   const GetTabeName=(item)=>{
     const database=item.itemValue
    fetch(`http://192.168.10.10/backend/api/values/gettable?TableName=${database}`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        setTableName(data)   
       
    });
    }
   
const GetColumnNames=(da)=>{
console.log('coulm name',da.itemValue)
const data=da.itemValue
      fetch(`http://192.168.10.10/backend/api/values/GetTableColumn?table=${data}`)
.then(res=>res.json())
.then((data)=>{
    console.log(data)
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
  console.log(a)
  console.log(a.length)
  let v=''
  for(let i=0;i<a.length-1;i++){
    v=v+a[i]
  }
  
  
setQColum(v);
 }

 const ShowQuery=()=>{
   if(QueryType==='Select'){
    let query= QueryType +' '+QColum+' '+'from'+' '+SelectedTable+' where '+WhereColumn+' '+condition+' '+conditionValue
    console.log(query)
    setQuery(query)
   }
   else if(QueryType=='insert'){
     let q=QueryType+'into values('+QColum+')';
     setQuery(q)
   }
   
 }

 const mData=()=>{
  const databaseName=SelectedDatabase
  console.log('eeeeeeeeeeeeeeeeeee',databaseName)
  fetch(`http://192.168.10.10/backend/api/values/ExcQuery?query=${query}&Table=${databaseName}`)
  .then(res=>res.json())
  .then((data)=>{
    console.log(data)
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

 const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>
          <ScrollView>
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
  {
    ColumnName.map(data=>{
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

        }}
          />
          <Text>{data.column}</Text>
          </View>
      )
    })
  }
  </View>
  <View>
  <View style={styles.QueryView}>
    <Text style={styles.heading1}> Select Query type  </Text>

    <Picker selectedValue={QueryType}
     dropdownIconColor="#21130d" 
     mode="dropdown" 
    style={styles.dataBasePiker}
    onValueChange={(item,index)=>{
      setQueryType(item)
      co()
    }}>
      <Picker.Item label=" " value=" " style={{textAlign:'center'}}/>
      <Picker.Item label="Select" value="Select" style={{textAlign:'center'}}/>
      <Picker.Item label="Insert" value="insert"/>
    </Picker>
    <TextInput 
    value={QColum}
    placeholder="Selected Column "
    style={styles.ColumnTextView}
    />
    <View style={{flex:1,flexDirection:'row',marginTop:10}}>
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={{fontSize:16,marginLeft:15}}> Where Condion</Text>
      </View>
      { 
       isEnabled==true ?<View style={{marginTop:10 }}>
<Text style={styles.heading1} >
  Select Column For Condition
</Text>
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
          :
          null
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
  <Button onPress={mData} title="Execute Query"
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
 
   <View style={{display:'flex',flex:1,flexDirection:'row'}}>
     <View style={styles.Mbtn}>
              <Button 
              title="Edit"
              onPress={() => {
                console.log('save')
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
            </View>
            <Button onPress={() => {
setShowModal(!showModal);
props.navigation.navigate("ExQuery",{
 userID: 1,
 q:query
})
}} title="ExQuery"
color="#fb5b5a"
accessibilityLabel="Learn more about this purple button"/> 
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
<View>
<Button
              title="Click To Close Modal"
              onPress={() => {
                setInputModel(!inputModel);
                setResult('')
                
              }}
            />
</View>

          </Modal>
        </View>
    )
  }

  const styles=StyleSheet.create({
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
      width:150,marginTop:100,marginRight:10,
    }
  })
  export default QueryBuilder;