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
    

    useEffect(() => {
      fetch('http://192.168.10.9/backend/api/values/GetDatabase')
      .then(res=>res.json())
      .then((data)=>{
          setDatabase(data)
          console.log(data);
      });            
    }, []);

    
   const GetTabeName=(item)=>{
     const database=item.itemValue
    fetch(`http://192.168.10.9/backend/api/values/gettable?TableName=${database}`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        setTableName(data)   
       
    });
    }
   
const GetColumnNames=(da)=>{
console.log('coulm name',da)
      fetch('http://192.168.10.9/backend/api/values/GetTableColumn?table=Customer')
.then(res=>res.json())
.then((data)=>{
    console.log(data)
    setCoulumnName(data)
});
    }

 
  
    return(
        <View style={{flex:1}}>
          <ScrollView>
            <View style={styles.DatabaseView}>
            <Text style={styles.heading1}>Select the Database</Text>
          <Picker style={styles.dataBasePiker}
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
<Button onPress={()=>{
  let a='';
  ColumnName.forEach(element => {
      if(element.isChecked==true){
          console.log(element.id,element.column)
           a=a+element.column+','
        
      }
      
  });
  console.log(a)
}} title="Learn More"
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
borderWidth:1,
marginTop:10
    },
    heading1:{
fontSize:18,
textAlign:'center',
marginTop:10,
fontWeight:'bold'
    },
    dataBasePiker:{
      height:30,
      marginTop:10,
      fontSize:16,
      marginLeft:15     
    },
    TableView:{
      flex:1,
justifyContent:'center',
width:'90%',
borderWidth:1
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
    },
  })
  export default QueryBuilder;