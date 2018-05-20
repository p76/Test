'use strict'

//系统组件
import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default class Alert1 extends Component{

    constructor(props) {
      super(props);
      
      this._blockAlert = this._blockAlert.bind(this);

    }

    _blockAlert(){
      Alert.alert(
            'alert回调弹窗',
            '这是一次带有回调事件的弹窗演示',
            [
              {text: 'Cancel', onPress: () => alert('点击了cancel')},
              {text: 'OK', onPress: () => alert('点击了ok')},
            ]
          )
    }

    render(){
        return(
          <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>Alert.alert('没错这就是普通弹出事件')}>
              <Text allowFontScaling={false} style={{flex:1,alignSelf:'center',marginTop:20,marginBottom:20,color:'white'}}>普通Alert事件</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._blockAlert()}>
              <Text allowFontScaling={false} style={{flex:1,alignSelf:'center',marginTop:20,marginBottom:20,color:'white'}}>回调Alert事件</Text>
            </TouchableOpacity>
          </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:64,
      flexDirection:'column',
    },
    buttonContainer:{
      marginTop:20,
      backgroundColor:'#4285f4',
    }
})