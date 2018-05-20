'use strict'

//系统组件
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {Toast} from 'c2-mobile';

export default class C2Toast extends Component{

    constructor(props) {
      super(props);
      
    }

    _maskToast(){
      var object = {
        title:'加载中···',
        mask:true,
        duration:2000,
      }
      Toast.show(object);

    }

    _withoutMaskToast(){
      //默认是10s消失
      var object = {
        title:'无遮罩加载···',
        icon:'ios-chatboxes'
      }
      Toast.show(object);
    }

    _plainText(){
      var object = {
        title:'纯文字提示···',
      }
      Toast.show(object);
    }

    _loading(){
      var object = {
        type:Toast.mode.C2MobileToastSuccess,
        mask:true,
        title:'loading···',
      }
      Toast.show(object);
    }

    _dismiss(){
      Toast.dismiss();
    }
    render(){
        return(
          <ScrollView style={styles.container}>

            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._dismiss()}>
              <Text allowFontScaling={false} style={{flex:1,alignSelf:'center',marginTop:20,marginBottom:20,color:'white'}}>取消提示</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._maskToast()}>
              <Text allowFontScaling={false} style={{flex:1,alignSelf:'center',marginTop:20,marginBottom:20,color:'white'}}>提示：Info···（有遮罩）</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._withoutMaskToast()}>
              <Text allowFontScaling={false} style={{flex:1,alignSelf:'center',marginTop:20,marginBottom:20,color:'white'}}>提示：Info···（无遮罩，允许用户同时操作）</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._plainText()}>
              <Text allowFontScaling={false} style={{flex:1,alignSelf:'center',marginTop:20,marginBottom:20,color:'white'}}>提示：纯文字（无遮罩，允许用户同时操作）</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._loading()}>
              <Text allowFontScaling={false} style={{flex:1,alignSelf:'center',marginTop:20,marginBottom:20,color:'white'}}>提示：Loading···（有遮罩）</Text>
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