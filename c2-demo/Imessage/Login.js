'use strict'

import {
  View,
  Text,
  WebView,
  StyleSheet,
  Platform,
}from'react-native';

import React, {Component} from 'react';
import {Actions,UserInfo,Config,Fetch,SSOAuth} from 'c2-mobile'

import {connect} from 'react-redux';

import {C2ABOrganizationActions} from 'c2-mobile-contacts';

//*************************正式环境版本配置*************************
var AuthHost = 'http://aip.test.c2cloud.cn';
var clientId = 'UMjzvjLnQyGTvSjfMgzGcw';
var clientSecret = 'nXOhPsSgRhGGNJho8WXPyg';
// var AuthHost = 'http://172.16.33.40:8084/server';
// var clientId = '72_82lYyTKmnsVsuCCqfHQ';
// var clientSecret = 'TdnG7HowQm6Nvbn0FRSPhw';

var redirect_uri = "http://aip.dev.c2cloud.cn";

var WEBVIEW_REF = 'webview';

class Login extends Component {

  constructor(props) {
    super(props);

    this._getLogUser = this._getLogUser.bind(this);
//初始化接口信息

    Config.mainUrl=AuthHost;

  }

  //获得登录用户的信息
  _getLogUser(){

    var props = this.props;

    Fetch.getJson('/oauth2/user_info',{access_token:Config.accesstoken})
    .then((response) => {
      UserInfo.initUserInfoWithDict(response);
      props.dispatch(C2ABOrganizationActions.getAssignUserData(response.id));
      Actions.ImessageDemo();
    }).catch((error)=>{
      console.warn('获取用户信息失败');
      alert('登录失败');
    });

  }

  render(){

    return(
      <View style={{flex:1,paddingTop:Platform.OS=='ios'?64:44}}>
        <SSOAuth
          AuthHost={AuthHost}
          clientId={clientId}
          clientSecret={clientSecret}
          redirectUri={redirect_uri}
          remember={true}
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

// ------------ redux -------------
const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Login);
