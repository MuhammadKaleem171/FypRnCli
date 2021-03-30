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
const Stack = createStackNavigator();
const Stack1 = createStackNavigator();

const My=()=>{
  return(
    <Stack1.Navigator >
      <Stack1.Screen name="Student" component={StudentLogin}/>
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
