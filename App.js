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
const Stack = createStackNavigator();
const App =()=> {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen}/>
      <Stack.Screen name="Student" component={StudentLogin}/>
      <Stack.Screen name="Teacher" component={TeacherLogIn}/>
    </Stack.Navigator>
    </NavigationContainer>

  );
};



export default App;
