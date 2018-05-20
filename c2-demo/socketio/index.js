/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import{
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
}from'react-native';
import React,{Component} from 'react';
import {WebView,Actions} from 'c2-mobile';

if(!window.navigator.userAgent){
  window.navigator.userAgent = 'ReactNative';
}

const io = require('socket.io-client/socket.io');

class UIWebAlternationn extends Component{

  constructor(props){
    super(props);

    const socket = io('http://127.0.0.1:3000/', {
      transports: ['websocket'] // you need to explicitly tell it to use websockets
    });
    socket.on('connect', () => {
      socket.emit('login', {userid:"123321",username:"gagagag"});
    });
    socket.on('message', function(data){
           console.log(data);
    });
    socket.on('disconnect', function(){
           console.log('拒绝链接');
    });
    this.onBridgeMessage = this.onBridgeMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._onChangeText = this._onChangeText.bind(this);

    this.state = {
      content:'',
    }
  }

  onBridgeMessage(message) {

      if(message=='pushUI'){
        Actions.UIWebAlternation1();
        return
      }
      alert('UI弹出:'+message);

  }
  
  onSend(){
      const { webviewbridge } = this.refs;
      webviewbridge.sendToBridge(this.state.content);
  }

  _onChangeText(text){
    this.setState({
      content:text
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
        style={{flex:1,marginTop:100}}
        ref="webviewbridge"
        onBridgeMessage={this.onBridgeMessage}
        javaScriptEnabled={true}
        source={require('./test.html')}/>
        <View style={{flex:1,backgroundColor:'#edecec',borderColor:'red',borderWidth:1}}>
          <Text>Native UI</Text>
          <TextInput onChangeText={this._onChangeText} style={{height:50,marginTop:10}}/>
          <TouchableOpacity onPress={()=>this.onSend()} style={{marginTop:15,backgroundColor:'#4285f4'}}><Text style={{marginTop:20,marginBottom:20,textAlign:'center',color:'white'}}>发送</Text></TouchableOpacity>
        </View>
        </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
module.exports = UIWebAlternationn;
