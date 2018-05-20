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

export default class ImagePickerManager extends Component{

    constructor(props){
        super(props)

        this._camera = this._camera.bind(this);
        this.state = {
            imageSource:null,
            uploadText:'没有图片需要上传',
            status:true
        }
    }

    _camera(){
        Camera.startWithPhoto()
        .then((response)=>{
                this.setState({
                    imageSource: response,
                    uploadText:response.uri,
                    status:false,
                });
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render(){
        return(
            <ScrollView style={{flex:1,paddingTop:Platform.OS =='ios'?64:44}}>
              <TouchableOpacity style={{flexDirection:'row',height:50,margin:20,borderColor:'#841584',borderWidth:1}} onPress={()=>this._camera()}>
                <Text style={{alignSelf:'center',flex:1,textAlign:'center'}}>点击拍照</Text>
              </TouchableOpacity>
              {this.state.imageSource==null?null:<Image source={{uri:this.state.imageSource.uri}} style={{width:200,height:200,resizeMode:'stretch',alignSelf:'center'}}/>}

            </ScrollView>
        )
    }
}