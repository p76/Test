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
  ScrollView,
} from 'react-native';

import {Actions} from 'c2-mobile';

export default class Index2 extends Component{

    constructor(props) {
      super(props);

      this._onChangeText = this._onChangeText.bind(this);
      this._commitBlock = this._commitBlock.bind(this);

      this.state = {
        textValue:'',
      };
    }

    _onChangeText(text){
        this.setState({
            textValue:text,
        })
    }

    _commitBlock(){
        this.props.block(this.state.textValue);
        Actions.pop();
    }

    render(){
        return(
            <ScrollView style={styles.container}>
              <Text allowFontScaling={false} style={[styles.textContent,{top:100}]}>Hello ，我是c2-mobile ，这是Index1页面</Text>
              <View style={styles.textinput}>
                <TextInput placeholder={'输入一个数值吧'} onChangeText={this._onChangeText} style={{flex:1}}/>
              </View>
              <TouchableHighlight onPress={()=>this._commitBlock()} style={styles.button}>
                <Text style={{alignSelf:'center',marginTop:15,marginBottom:15}}>点击一下回传</Text>
              </TouchableHighlight>
                <Text allowFontScaling={false} style={styles.blockText}>来自Index1的值:{this.props.textcontent == ''?'还没有值哟!':this.props.textcontent}</Text>
              <TouchableHighlight onPress={()=>Actions.Index3()} style={styles.button}>
                <Text style={{alignSelf:'center',marginTop:15,marginBottom:15}}>点击进入Tab演示</Text>
              </TouchableHighlight>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#4285f4',
    },
    textContent:{
        marginLeft:10,
        color:'white',
    },
    textinput:{
        marginTop:110,
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