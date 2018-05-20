'use strict'

import {
  View,
  Text,
  WebView,
  StyleSheet,
  Platform,
}from'react-native';

import React, {Component} from 'react';
import {UserInfo,Config,Fetch,SSOAuth,Actions} from 'c2-mobile'

//*************************正式环境版本配置*************************
var AuthHost = 'http://auth.c2cloud.cn';
var clientId = 'B80CE033731C48B5B4F516C0A8EF889B';
var clientSecret = 'A5EFE642B1AD45F09FBD9612C58C51AB';
var redirect_uri = AuthHost+'/appIndex.html';

var Auth_URL = AuthHost+'/oauth2/authorize?client_id='+clientId+'&response_type=code&scope=user.read,dev&redirect_uri='+redirect_uri;
var Logout_URL = AuthHost+'/oauth2/logout?client_id='+clientId+'&response_type=code&redirect_uri='+redirect_uri;

var WEBVIEW_REF = 'webview';

class authWebView extends Component {

  constructor(props) {
    super(props);

    this._getLogUser = this._getLogUser.bind(this);
//初始化接口信息

//设置http请求host
    Config.mainUrl="http://project.c2cloud.cn";

  }

  //获得登录用户的信息(根据自身业务系统接口进行调整)
  _getLogUser(){
    Fetch.postJson('/ws/getLogUser',{})
    .then((response) => {
      UserInfo.initUserInfoWithDict(response.result);
      Actions.UserInfo(); 
    }).catch((error)=>{
      console.warn('获取用户信息失败');
      alert('登录失败');
    });
  }

  render(){

    return(
      <View style={{flex:1,paddingTop:Platform.OS=='ios'?64:40,}}>
        <SSOAuth
          AuthHost={AuthHost}
          clientId={clientId}
          clientSecret={clientSecret}
          redirectUri={redirect_uri}
          onLoginSuccess={(data)=>{this._getLogUser()}}
          onLoginError={()=>alert('失败')}
          onLogoutSuccess={()=>alert('失败')}
        />
      </View>
    )
  }

}

let styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#edecec',
  }
})

module.exports = authWebView;
