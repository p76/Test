'use strict'

//系统组件
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {VectorIcon,Actions} from 'c2-mobile';

export default class AnimationPro extends Component{

    constructor(props) {
      super(props);
      
    }

    render(){
        return(
          <View>
          </View>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:64,
        flexDirection:'column',
    },
    sectionContainer:{
        height:40,
        backgroundColor:'#4285f4',
    }
})