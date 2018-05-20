'use strict'

//系统组件
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {VectorIcon,Actions} from 'c2-mobile';
export default class MSG extends Component{

    constructor(props) {
      super(props);

      this._onChangeText = this._onChangeText.bind(this);
      this._sendMsg = this._sendMsg.bind(this);

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

    _sendMsg(){
         Linking.openURL("sms://13607330871");
    }

    //css三种写法 嵌入  引用  混合
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#4285f4'}}>
              <View style={styles.infoContainer}>
                <VectorIcon name="rocket" style={[styles.textContent,{fontSize:24}]}/>
                <Text allowFontScaling={false} style={styles.textContent}>在文本框中输入一个手机号码，然后点击按钮调起发送界面</Text>
              </View>
              <View style={styles.textinput}>
                <TextInput placeholder={'输入一个手机号吧'} onChangeText={this._onChangeText} style={{flex:1}}/>
              </View>
              <TouchableHighlight onPress={()=>this._sendMsg()} style={styles.button}>
                <Text style={{alignSelf:'center',marginTop:15,marginBottom:15}}>点击一下调起发送</Text>
              </TouchableHighlight>
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