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

    const OderBYF = () => setOrderBy(previousState => !previousState);
    const WhereClauseF = () => setWhereClause(previousState => !previousState);

    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView>
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

<Text> wheerreeeeeeeeeeee</Text>
    </View>
    :null
    
    }

</View>


</ScrollView>
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