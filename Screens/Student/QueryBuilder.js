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
    Switch
  } from "react-native";
  
  import CheckBox from '@react-native-community/checkbox'
  import {Picker} from '@react-native-picker/picker'
  const QueryBuilder=()=>{

    const[Database,setDatabase]=useState([])
    const[SelectedDatabase,setSelectedDatabase]=useState()
    const [TableName,setTableName]=useState([])
    const[SelectedTable,setSelecteTable]=useState()
    const [ColumnName,setCoulumnName]=useState([])
    const [QueryType,setQueryType]=useState('Select')
    const [QColum,setQColum]=useState('')
    const [isEnabled, setIsEnabled] = useState(false);

    const[WhereColumn,setWhereColumn]=useState()
    const[condition,setCondition]=useState()
    const [conditionValue,setConditionValue]=useState()
    
    

    useEffect(() => {
      fetch('http://192.168.10.3/backend/api/values/GetDatabase')
      .then(res=>res.json())
      .then((data)=>{
          setDatabase(data)
          console.log(data);
      });            
    }, []);

    
   const GetTabeName=(item)=>{
     const database=item.itemValue
    fetch(`http://192.168.10.3/backend/api/values/gettable?TableName=${database}`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        setTableName(data)   
       
    });
    }
   
const GetColumnNames=(da)=>{
console.log('coulm name',da)
      fetch('http://192.168.10.3/backend/api/values/GetTableColumn?table=Customer')
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
     const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return(
        <View style={{flex:1,backgroundColor:'#d5e3e5'}}>
          <ScrollView>
            <View style={styles.DatabaseView}>
            <Text style={styles.heading1}>Select the Database</Text>

            <View style={{flex:1,flexDirection:'row',borderWidth:0.4}}>
          <Picker style={styles.dataBasePiker}
          mode="dropdown"
          dropdownIconColor="#21130d"      
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
</View>

{/*  Select table View    */}
<View style={styles.TableView} >

<Text style={styles.heading1}>Select Table Name </Text>

<View style={{borderWidth:1,flex:1}}>
<Picker style={styles.dataBasePiker}
mode="dropdown"
dropdownIconColor="#21130d"  
  selectedValue={SelectedTable}
  onValueChange={((itemValue, itemIndex)=>{
    setSelecteTable(itemValue)
    GetColumnNames(itemValue)
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
</View>
 {ColumnName.length>=1 ?
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
:null
  } 
  <View style={styles.QueryView}>
    <Text style={styles.heading1}> Select Query type  </Text>

    <Picker selectedValue={QueryType} 
    mode="dropdown"
    dropdownIconColor="#21130d"  
    style={styles.dataBasePiker}
    onValueChange={(item,index)=>{
      setQueryType(item)
      co()
    }}>
      <Picker.Item label="Select" value="Select" style={{textAlign:'center'}}/>
      <Picker.Item label="Insert" value="insert"/>
    </Picker>
    <TextInput 
    value={QColum}
    placeholder="Selected Column "
    style={styles.ColumnTextView}
    />
    <View style={{flex:1,flexDirection:'row',marginTop:10}}>
    <Switch style={{width:100}}
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
<Text >
  Select Column For Condition
</Text>
<Picker style={styles.dataBasePiker}
mode="dropdown"
dropdownIconColor="#21130d"  
  selectedValue={WhereColumn}
  onValueChange={((itemValue, itemIndex)=>{
    setWhereColumn(itemValue)
  }
  )
  }>
    { 
      ColumnName.map((item,id)=>{
        return(  <Picker.Item  key={item.id} label={item.column} value={item.color} />)
      })
    }
</Picker>
<Text> Select Condition</Text>
<Picker selectedValue={condition} 
mode="dropdown"
dropdownIconColor="#21130d"  
    style={styles.dataBasePiker}
    onValueChange={(item,index)=>{
      setCondition(item)
      console.log(item)
    }}>
      <Picker.Item label=">" value=">" />
      <Picker.Item label="<" value=">"/>
      <Picker.Item label="=" value="="/>
    </Picker>
  <View>
  <TextInput 
    value={conditionValue}
    placeholder="enter Condition Value"
    style={styles.ColumnTextView}
    />
    </View>
       </View>
          :
          null
      }
  </View>
  <Button onPress={co} title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/> 
          </ScrollView>
   
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
fontWeight:'bold'
    },
    dataBasePiker:{
     borderWidth:1,
      marginTop:10,
      fontSize:16,
      marginLeft:15,
      borderColor:'black',
      color:'black',
      width:'70%'
    },
    TableView:{
      flex:1,
justifyContent:'center',
width:'90%',
marginLeft:20
    },
    ColumView:{
      flex: 1,
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    display:'flex',
    width:'50%',
    alignSelf:'center',
    borderWidth:0.3,
  marginLeft:20
    },
    QueryView:{
     
      justifyContent:'center',
      width:'90%',
    },
    ColumnTextView:{
      height:40,
      backgroundColor:'#fff',
      marginTop:10,
      width:'95%',
      marginLeft:10,
      borderBottomWidth:1,
      marginTop:20
    }
  })
  export default QueryBuilder;