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
import {Actions,WebView} from 'c2-mobile';
class UIWebAlternationn extends Component{

  constructor(props){
    super(props);
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
