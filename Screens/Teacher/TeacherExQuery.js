import React, { useState ,useEffect} from 'react'

import {
    View,Text,TouchableOpacity,Button
}
from 'react-native'

import IpAddress  from '../../Enviornment/Ipconfig'

const QuestionList=[
    {
    QuestionNo:1,
    Answer:"select * from Product",
    databaseName:"Ecomerce",
},
{
QuestionNo:2,
Answer:"select * from Product where Product_Description='sumsung'and ProductID>2",
databaseName:"Ecomerce"
},
{
    QuestionNo:3,
    Answer:"select * from Product where Quantity <5",
    databaseName:"Ecomerce"
    },

]

const TeacherExQuery=(props)=>{
    const[result,setResult]=useState([])

    const [answer,setAnswer]=useState([])

    useEffect(()=>{
setAnswer(QuestionList)


    },[]
     
    )
    console.log(props)
    
    const mData=(Q,an)=>{
        console.log(Q)
        console.log(an)
         fetch(`http://${IpAddress}/backend/api/values/ExcQuery?query=${an}&Table=${Q}`)
         .then(res=>res.json())
         .then((data)=>{
           console.log('cccccccccccccccccccccc',data)
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
        if(result.length>=1){
        let d=Object.keys(result[0])
        const d1 =d.filter((item,index)=>d.indexOf(item)==index)
       return(
     <View style={{borderWidth:1,flexDirection:'row',marginTop:10}}>
       {
         d1.map((i,index)=>(
           <View  key={index} style={{flexDirection:'row',display:'flex',width:70,}}>
             <Text style={{textAlign:'center'}} > {i}</Text>
           </View>
            
         )
           )}
     </View>
       )
       }
     }
return(
    <View>
       
      <View style={{marginTop:5,display:'flex',flexDirection:'column'}}>
          {
              answer!=null?
              answer.map((data,index)=>{
return(
    <View key={index} style={{display:"flex",flexDirection:'row',borderEndWidth:1,marginBottom:5}}>
    <View style={{width:40,height:20}}>
        <Text>Q#{data.QuestionNo}</Text>
    </View>
   <View>
       <TouchableOpacity onPress={()=>{mData(data.databaseName,data.Answer)}}>
        <Text>Ans:{data.Answer}</Text>
        </TouchableOpacity>
    </View>
    </View>
)
              })
              :null
          }
        
      </View>
<Button onPress={mData} title="Execute Query"
color="#841584"
accessibilityLabel="Learn more about this purple button"/> 
      
        { Taheader()}
      { 
      result!==undefined?
      
        result.map((m,i)=>{
          
            return(
              <View key={i} style={{flexDirection:'row'}} >{
              Object.keys(m).map((i,index)=>(
              <View  key={index} style={{flexDirection:'row',display:'flex',width:70}}>
                <Text style={{textAlign:'center',fontSize:12}} >  {m[i]}</Text>
              </View>
               
            )
              )}
              </View>
              )
        }
          ):null
    } 
</View>
)
}
export default TeacherExQuery;