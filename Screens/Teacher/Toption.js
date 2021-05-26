import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'


/**
* @author
* @function Toption
**/
const Toption = ({navigation}) => {

const { container } = styles
 return(
  <View style={container}>
      <View style={{flex:1,position:'relative',top:30}}>
          <Text style={styles.title1}> Select Option </Text>
      </View>
  <View style={{display:'flex',width:'100%',flex:2}}>
  <TouchableOpacity  style={styles.btn} onPress={()=>navigation.navigate('UploadAssignment')}>
        <Text style={styles.title}> Upload Assignment</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.btn} onPress={()=>navigation.navigate('Home',{screen:'Student'})}>
        <Text style={styles.title}> Check Assignment's</Text>
      </TouchableOpacity>
  </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  },
  btn:{
    width:'80%',
    backgroundColor:'#fb5b5a',
    height:40,
    alignContent:'center',
    marginBottom:30,
    justifyContent:'center',
    marginLeft:25,
   

  },
  title:{
    fontSize:20,
    textAlign:'center',
    color:'#fff',
    justifyContent:'center',
    padding:5
  },
  title1:{
    fontSize:20,
    textAlign:'center',
    justifyContent:'center',
    padding:5,
    color:'black'
  }
})
export default Toption;