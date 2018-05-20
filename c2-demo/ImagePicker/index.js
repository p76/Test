'use strict'

import{
    ScrollView,
    TouchableOpacity,
    Text,
    View,
    Image,
    Platform
}from 'react-native';

import {ImagePicker,FileManager,Camera,Config} from 'c2-mobile';
import React,{Component} from'react';

export default class ImagePickerManager extends Component{

    constructor(props){
        super(props)

        this.state = {
            imageSource:null,
            uploadText:'没有图片需要上传',
            status:true
        }
    }

    _selectImage(){
        
        var DEFAULT_OPTIONS = {
            mainColor:'#ffffff',
            tintColor:'#333333',
            accentColor:'#62b900',
            backgroundColor:'#ffffff',
            picMax:5,
            picMin:1,
        };

        ImagePicker.show(DEFAULT_OPTIONS)
        .then((response)=>{
            this.setState({
                imageSource:response
            })
            console.log('成功回调');
        }).catch((e)=>{
            console.log('失败回调');
        })
    }

    _redernImageGroup(){
        if(this.state.imageSource==null){
            return null;
        }else{
            var domTemp = [];
            for(var i = 0 ; i < this.state.imageSource.length ; i++){
                domTemp.push(<Image key={i} source={{uri:this.state.imageSource[i].uri}} style={{width:200,height:200,resizeMode:'stretch',alignSelf:'center'}}/>)
            }
            return(
                <View style={{flex:1,flexDirection:'column'}}>
                {domTemp}
                </View>
            )
        }
        
    }
    render(){

        return(
            <ScrollView style={{flex:1,paddingTop:Platform.OS =='ios'?64:44}}>

              <TouchableOpacity style={{flexDirection:'row',height:50,margin:20,borderColor:'#841584',borderWidth:1}} onPress={()=>this._selectImage()}>
                <Text style={{alignSelf:'center',flex:1,textAlign:'center'}}>相册选择照片</Text>
              </TouchableOpacity>
              <Text style={{marginTop:20,alignSelf:'center',flex:1,textAlign:'center'}}> 下面这个按钮是测试照片上传功能的，请先选择一张照片再进行测试</Text>
              {this._redernImageGroup()}
            </ScrollView>
        )
    }
}