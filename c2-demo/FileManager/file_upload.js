'use strict'

import{
    View,
    ProgressViewIOS,
    ActivityIndicator,
    Text,
    Image,
    Platform,
    TouchableOpacity,
    Button,
} from 'react-native';

import{
    FileManager,
    ImagePicker,
    Video,
}from 'c2-mobile';

import React,{Component} from 'react';

export default class DownloadFile extends Component{

    constructor(props){
        super(props)

        this._loadInitFile = this._loadInitFile.bind(this);
        this._startUpload = this._startUpload.bind(this);

        this.state = {
            imageSource:null,
            uploadInfo:null,
            progressPercent:0,
        }
    }

    componentDidMount(){
        this._loadInitFile();
    }

    _loadInitFile(){
        //如果是从ImagePicker 等C2组件里面获取的本地资源，可直接将文件对象模型作为source传进去

        var source = {
            uri:"http://cdn-qn0.jianshu.io/assets/default_avatar/12-07a584b5038a24cbb23b81dc673c18fd.jpg",
            fileName:"test1.jpg"
        };

        var params = {
            source:source,
            dirMode:FileManager.DirMode.cache,
            progress:(events)=>{
              console.log('demo文件正在下载:'+parseInt(events.completedUnitCount/events.totalUnitCount)+'%');
            }
        }
        FileManager.downloadFile(params)
        .then((respones)=>{
            this.setState({
                imageSource:respones,
            })
            alert('上传文件已准备就绪');
        }).catch((e)=>{
            alert('下载失败');
        });
    }

    _startUpload(){
        
        //如果是从ImagePicker 等C2组件里面获取的本地资源，可直接将文件对象模型作为source传进去
        var params = {
            source:this.state.imageSource,
            url:"http://172.16.33.51:8080/meeting/v1/rooms/123/files/upload",
            formData:{test:'test'},
            name:'test1',
            header:{test2:'test2'},
            progress:(events)=>{
            //进度回调，提供给UI显示进度用
              let percent = parseInt(events.completedUnitCount/events.totalUnitCount*100);
              this.setState({
                progressPercent:percent,
              })
            }
        }
        FileManager.uploadFile(params)
        .then((respones)=>{
            alert('上传成功');
            this.setState({
                uploadInfo:'网络地址:'+respones.url,
            })
        }).catch((e)=>{
            alert('上传失败');
        });
    }

    _selectImage(){
        
        var DEFAULT_OPTIONS = {
            mainColor:'#ffffff',
            tintColor:'#333333',
            accentColor:'#62b900',
            backgroundColor:'#ffffff',
            picMax:2,
            picMin:1,
        };

        ImagePicker.show(DEFAULT_OPTIONS)
        .then((response)=>{
            this.setState({
                imageSource:response[0]
            })
            console.log('成功回调');
        }).catch((e)=>{
            console.log('失败回调');
        })
    }

    render(){
        var progressPercent = this.state.progressPercent;
        const ProgressViewComponent = Platform.OS == 'ios' ? ProgressViewIOS:ActivityIndicator;
        return (
            <View style={{flex:1,marginTop:Platform.OS =='ios'?64:44}}>
              <View style={{height:110}}>
                <ProgressViewComponent style={{flex:1,marginLeft:20,marginRight:20}} progress={this.state.progressPercent/100}/>
                <Button style={{flex:1}} title={progressPercent == 0?'开始上传':'上传'+progressPercent.toString()+'%'} onPress={this._startUpload}/>
                <Button style={{flex:1}} title={'相册选择照片'} onPress={()=>this._selectImage()}/>
              </View>
              {this.state.uploadInfo==null?null:<Text>{this.state.uploadInfo}</Text>}
              {this.state.imageSource==null?null:<Image source={{uri:this.state.imageSource.uri}} style={{flex:1}} />}
            </View>
            )
    }

} 