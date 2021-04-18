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
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
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

const Stack = createStackNavigator();
const Stack1 = createStackNavigator();

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

      
      <Stack1.Screen name="query" component={QueryBuilder}/>
      <Stack1.Screen name="ExQuery" component={ExecuteQuery}/>
    </Stack1.Navigator>
  )
}

const App =()=> {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen}/> 

      <Stack.Screen  options={{headerShown: false}} name="Home" component={My}/>
      <Stack.Screen name="Teacher" component={TeacherLogIn}/>
    </Stack.Navigator>
    </NavigationContainer>

  );
};



export default App;
