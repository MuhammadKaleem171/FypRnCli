import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


/**
* @author
* @function UploadAssignment
**/
const UploadAssignment = (props) => {
    console.debug(props)

const { container } = styles
 return(
  <View style={container}>
    <Text>UploadAssignment</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  }
})
export default UploadAssignment