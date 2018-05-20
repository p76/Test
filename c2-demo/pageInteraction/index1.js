'use strict'

//系统组件
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {VectorIcon,Actions} from 'c2-mobile';
export default class Index1 extends Component{

    constructor(props) {
      super(props);

      this._onChangeText = this._onChangeText.bind(this);
      this._updateBlock = this._updateBlock.bind(this);

      this.state = {
        textValue:'',
        blockValue:'',
      };
    }

    _onChangeText(text){
        this.setState({
            textValue:text,
        })
    }

    _updateBlock(text){
        this.setState({
            blockValue:text, 
        })
    }

    //css三种写法 嵌入  引用  混合
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#4285f4'}}>
              <View style={styles.infoContainer}>
                <VectorIcon name="rocket" style={[styles.textContent,{fontSize:24}]}/>
                <Text allowFontScaling={false} style={styles.textContent}>Hello ，我是c2-mobile ，这是Index1页面</Text>
              </View>
              <View style={styles.textinput}>
                <TextInput placeholder={'输入一个数值吧'} onChangeText={this._onChangeText} style={{flex:1}}/>
              </View>
              <TouchableHighlight onPress={()=>Actions.Index2({textcontent:this.state.textValue,block:this._updateBlock.bind(this)})} style={styles.button}>
                <Text style={{alignSelf:'center',marginTop:15,marginBottom:15}}>点击一下回传</Text>
              </TouchableHighlight>
              <Text allowFontScaling={false} style={styles.blockText}>回传值:{this.state.blockValue == ''?'还没有值哟!':this.state.blockValue}</Text>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    infoContainer:{
        flexDirection:'row',
        marginTop:100,
    },
    textContent:{
        alignSelf:'center',
        marginLeft:10,
        color:'white',
    },
    textinput:{
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        paddingLeft:10,
        paddingRight:10,
        height:50,
        backgroundColor:'white',
        borderRadius:5,
    },
    button:{
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'white',
        borderRadius:5,
        overflow:'hidden',
    },
    blockText:{
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        color:'white',
    }
})