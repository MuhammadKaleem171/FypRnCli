import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
 
} from "react-native"; 

export default TeacherLogIn =({navigation}) =>{
  const [userName,setUserName]=useState('')  
  const [password,setPassword]=useState('')
    return(
        <View style={{display:'flex',flex:2,backgroundColor:'red'}}>
          <View style={styles.container}>


<KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}  style={styles.form}>
 {<Image source = {require("../../assets/teacher.png")}style = {{ width: 100, height: 100,display:'flex',marginLeft:100}}/> }
<View style={{display:'flex',marginBottom:20,alignItems:'center' }}>
  <Text style={{fontSize:34,fontFamily:'ariel',color:'#fb5b5a',fontWeight:'600'}}> Teacher Log-In </Text>
  </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="User Name "
          placeholderTextColor="black"
          onChangeText={(userName) => setUserName(userName)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity style={styles.loginBtn} onPress={()=>console.log('hello',userName,password)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView >
      <Button onPress={()=>navigation.navigate('TeacherScreen')} title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/>  
    </View>

    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  backgroundColor:'#fff',
    alignItems: "center",
    justifyContent: "center",
    display:'flex',
    //flexDirection:'column',
  },
  form:{
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
width:'90%',

justifyContent:'center',
borderWidth:1


  }, 
  inputView: {
  borderBottomWidth:1,
    width: "100%",
    height: 45,
    marginBottom: 50,
    alignItems: 'center',
    color:'black'
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "99%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fb5b5a",
    
  },
  loginText:{
    fontSize:14,
    color:'white',
    textAlign:'center'
  }
});