'use strict'

//系统组件
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

//第三方依赖组件
import {Actions} from 'c2-mobile';//导航路由

export default class Tab2 extends Component{

    render(){
        return(
            <ScrollView style={styles.container}>
              <TouchableHighlight style={{marginTop:100,marginLeft:15,marginRight:15,borderRadius:5,backgroundColor:'#edecec'}} onPress={()=>Actions.pop()}>
                <Text style={{alignSelf:'center',marginTop:10,marginBottom:10,}}>这是tab2 点击返回Index2</Text>
              </TouchableHighlight>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#4285f4',
    }
})