import React from 'react'

import {
View,Text,TouchableOpacity,Button    
}
from 'react-native'

const ExecuteQuery=(props)=>{
console.log('neexxt ',props)
console.log(props.route.params)
    return(
        <View>
            <Text> Hello </Text>
            <Text> {props.route.params.q} </Text>
        </View>
    )
}
export default ExecuteQuery;