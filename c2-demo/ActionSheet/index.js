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

import {ActionSheet} from 'c2-mobile';

export default class C2ActionSheet extends Component{

    constructor(props) {
      super(props);
      
      this.state = {
        index:null
      }
    }

    _show(){
      var params = {
        options:['test1','test2','test3','test4'],
        title:'请选择一个合适的选项',
      }
      ActionSheet.showActionSheetWithOptions(params)
      .then((index)=>{
        this.setState({index:index});
      });
    }

    render(){
        return(
          <ScrollView style={styles.container}>
            <Text>当前选择Options的索引:{this.state.index}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._show()}>
              <Text allowFontScaling={false} style={{flex:1,alignSelf:'center',marginTop:20,marginBottom:20,color:'white'}}>弹出ActionSheet</Text>
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