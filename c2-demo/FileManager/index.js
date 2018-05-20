'use strict'

import{
    ScrollView,
    TouchableOpacity,
    Text,
    Platform
}from 'react-native';

import React,{Component} from'react';
import {Actions} from 'c2-mobile';

export default class FileManager extends Component{

    render(){
        return(
            <ScrollView style={{flex:1,paddingTop:Platform.OS =='ios'?64:44}}>
              <TouchableOpacity style={{flexDirection:'row',height:50,margin:20,borderColor:'#841584',borderWidth:1}} onPress={()=>Actions.FileManagerfileUpload()}>
                <Text style={{alignSelf:'center',flex:1,textAlign:'center'}}>文件上传</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row',height:50,margin:20,borderColor:'#841584',borderWidth:1}} onPress={()=>Actions.FileManagerfiledownload()}>
                <Text style={{alignSelf:'center',flex:1,textAlign:'center'}}>文件下载</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row',height:50,margin:20,borderColor:'#841584',borderWidth:1}} onPress={()=>Actions.FileManagerfileOpen()}>
                <Text style={{alignSelf:'center',flex:1,textAlign:'center'}}>打开第三方文件</Text>
              </TouchableOpacity>
            </ScrollView>
        )
    }
}