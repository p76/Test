'use strict'

//系统组件
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

import {UserInfo,Actions} from 'c2-mobile';;

export default class UserInfoView extends Component{

    constructor(props) {
      super(props);

      this._popLogout = this._popLogout.bind(this);
    }

    _popLogout(){
      Actions.pop();
    }

    render(){
        return(
            <ScrollView style={styles.container}>
              <Text numberOfLines={1} style={{flex:1,fontSize:14,margin:10}}>用户ID:<Text style={{color:'#4285f4'}}>{UserInfo.UserId}</Text></Text>
              <Text style={{flex:1,fontSize:14,margin:10}}>用户名称:<Text style={{color:'#4285f4'}}>{UserInfo.userName}</Text></Text>
              <Text style={{flex:1,fontSize:14,margin:10}}>姓名:<Text style={{color:'#4285f4'}}>{UserInfo.userRealname}</Text></Text>
              <TouchableOpacity style={{backgroundColor:'#4285f4'}} onPress={()=>this._popLogout()}>
                <Text style={{flex:1,margin:20,textAlign:'center',color:'white'}}>退出登录</Text>
              </TouchableOpacity>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:Platform.OS=='ios'?64:40,
    },
    textinput:{
        flex:1,
        height:40,
        margin:20,
        borderColor:'#edecec',
        borderWidth:1,
        borderRadius:5,
    },
    button:{
        flex:1,
        alignSelf:'center',
        margin:20,
        borderRadius:5,
        backgroundColor:'#4285f4',
    }
})