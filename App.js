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
import MainScreen from './Screens/MainScreen';
import StudentLogin from './Screens/Student/StudentLogin'
import TeacherLogIn from './Screens/Teacher/TeacherLogin'

const App =()=> {
  return (
    <View style={{display:'flex',flex:1}}>
<StudentLogin/>
<TeacherLogIn/>
</View>

  );
};



export default App;
