'use strict'

import{
    ScrollView,
    TouchableOpacity,
    Text,
    View,
    Image,
    Platform
}from 'react-native';

import {ImagePicker,FileManager,Camera} from 'c2-mobile';
import React,{Component} from'react';

import C2Push from 'c2-mobile-push';

export default class PushServer extends Component{

    constructor(props){
        super(props)

        this._startServer = this._startServer.bind(this);
    }

    _startServer(){
        C2Push.initPush()
        .then((result)=>{
          console.log('渠道:'+result.channels+"****Token:"+result.token);
        })
        .catch((e)=>{

        });

        C2Push.addReceiveCustomMsgListener((msg)=>{
            console.log('输出透传消息:'+msg);
        })
    }

    _getToken(){
        C2Push.getInfo((callback)=>{
            console.log(callback)
        })

    }
    render(){
        return(
            <ScrollView style={{flex:1,paddingTop:Platform.OS =='ios'?64:44}}>
              <TouchableOpacity style={{flexDirection:'row',height:50,margin:20,borderColor:'#841584',borderWidth:1}} onPress={()=>this._startServer()}>
                <Text style={{alignSelf:'center',flex:1,textAlign:'center'}}>启动服务</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row',height:50,margin:20,borderColor:'#841584',borderWidth:1}} onPress={()=>this._getToken()}>
                <Text style={{alignSelf:'center',flex:1,textAlign:'center'}}>获得Token</Text>
              </TouchableOpacity>
              {this.state.imageSource==null?null:<Image source={{uri:this.state.imageSource.uri}} style={{width:200,height:200,resizeMode:'stretch',alignSelf:'center'}}/>}

            </ScrollView>
        )
    }
}