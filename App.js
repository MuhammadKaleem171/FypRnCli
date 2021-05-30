/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Button,BackHandler
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './Screens/MainScreen'

import StudentLogin from './Screens/Student/StudentLogin'
import TeacherLogIn from './Screens/Teacher/TeacherLogin'
import QueryBuilder from './Screens/Student/QueryBuilder'
import ExecuteQuery from './Screens/Student/ExecuteQuery';
import LabList from './Screens/Student/LabList';
import Select_Clause from './Screens/Student/QScreen/Select_Clause';
import Arithmetic from './Screens/Student/QScreen/Arithmetic';
import Concatenation from './Screens/Student/QScreen/Concatenation';
import OrderBy from './Screens/Student/QScreen/OrderBy';
import Logical_operators from './Screens/Student/QScreen/Logical_operators';
import GroupBy from './Screens/Student/QScreen/GroupBy';
import ComparisonOperators from './Screens/Student/QScreen/Comparison_Operators';
import LIKEOperator from './Screens/Student/QScreen/LikeOperators';
import AggregateFunction from './Screens/Student/QScreen/AggregateFunction';
import Joins from './Screens/Student/QScreen/Joins';
import Final from './Screens/Student/QScreen/Final';
import StartScreen from './Screens/StartScreen';
import MidTerm from './Screens/Student/QScreen/MidTerm';
import Toption from './Screens/Teacher/Toption';
import UploadAssignment from './Screens/Teacher/UploadAssignment';
import CheckAssignment from './Screens/Teacher/CheckAssignment';

const Stack = createStackNavigator();
const Stack1 = createStackNavigator();
const T_Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const My=()=>{
  return(
    <Stack1.Navigator >
      
      <Stack1.Screen name="Student" component={StudentLogin}/>
      <Stack1.Screen name="Labs" component={LabList}/>
      <Stack1.Screen name="Select" component={Select_Clause} />
      <Stack1.Screen name="Arithmetic" component={Arithmetic}/>
      <Stack1.Screen name="Concatenation" component={Concatenation}/>
      <Stack1.Screen name="OrderBy" component={OrderBy}/>
      <Stack1.Screen name="Logical_operators" component={Logical_operators}/>
      <Stack1.Screen name="GroupBy" component={GroupBy}/>
      <Stack1.Screen name="ComparisonOperators" component={ComparisonOperators}/>
      <Stack1.Screen name="LIKEOperator" component={LIKEOperator}/>
      <Stack1.Screen name= "Agg"  component={AggregateFunction}/>
      <Stack1.Screen name="Joins" component={Joins}/>

      
      <Stack1.Screen name="query" component={QueryBuilder}/>
      <Stack1.Screen name="ExQuery" component={ExecuteQuery}/>
      <Stack1.Screen name="Final" component={Final}/>
      <Stack1.Screen name="MidTerm" component={MidTerm}/>
    </Stack1.Navigator>
  )
}
const Tabnavi=()=>{
  return(
    <Tab.Navigator  tabBarOptions={{
      activeTintColor: '#fff',
      activeBackgroundColor:'#fb5b5a',
      labelStyle:{
        fontSize:14,
        textAlign:"center",
        alignSelf:'center',
        justifyContent:'center'
      },
      labelPosition:'beside-icon',


    }}>
    <Tab.Screen name="UploadAssignment" component={UploadAssignment} options={{
      tabBarLabel:"Upload Assignment", 

    }} 

    />
     <Tab.Screen name="CheckAssignment" component={CheckAssignment}/>
     </Tab.Navigator>
  )
}
const TeacherStack=()=>{
  return(
 <T_Stack.Navigator>
  
  <T_Stack.Screen name="TeacherLogin" component={TeacherLogIn}/>
  <T_Stack.Screen name ="Toptions" component={Toption}/>
  <T_Stack.Screen name ="UploadAssignment" component={UploadAssignment}/>
  <T_Stack.Screen name ="TeacherScreen" component={Tabnavi}/>

   </T_Stack.Navigator>
  )
}

const App =()=> {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="StartScreen">
    <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}}/>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{headerRight: () => (
            <Button
              onPress={() => BackHandler.exitApp()}
              title="  X  "
              color="#fb5b5a"
            />
          )}}/> 

      <Stack.Screen  options={{headerShown: false}} name="Home" component={My}/>
      <Stack.Screen name="Teacher" component={TeacherStack} options={{headerShown: false}} />
    </Stack.Navigator>
    </NavigationContainer>

  );
};



export default App;
