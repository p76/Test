'use strict'

import{
    View,
    ProgressViewIOS,
    ActivityIndicator,
    Image,
    Platform,
    Button,
} from 'react-native';

import{
    FileManager,
    Video,
    ImagePicker,
}from 'c2-mobile';

import React,{Component} from 'react';
var resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
var progressREF;
export default class DownloadFile extends Component{

    constructor(props){
        super(props)

        this._startDownload = this._startDownload.bind(this);

        this.state = {
            videourl:null,
            progressPercent:0,
            showVideo:false,
        }
    }

    _startDownload(){
        if(this.state.progressPercent == 100){
            this.setState({showVideo:true})
            return;
        }
        
        var params = {
            source:{uri:"http://www.m3306.com/wp-content/uploads/2016/11/Free-Converter.com-big_buck_bunny-30420640.mp4"},
            dirMode:FileManager.DirMode.cache,
            progress:(events)=>{
              let percent = parseInt(events.completedUnitCount/events.totalUnitCount*100);
              this.setState({
                progressPercent:percent,
              })
            },
            header:{},
        }
        FileManager.downloadFile(params)
        .then((respones)=>{

            this.setState({
                videourl:respones
            })
        }).catch((e)=>{
            alert('下载失败');
        });
    }

    render(){
        var progressPercent = this.state.progressPercent;
        const ProgressViewComponent = Platform.OS == 'ios' ? ProgressViewIOS:ActivityIndicator;
        return (
            <View style={{flex:1,marginTop:Platform.OS =='ios'?64:44}}>
              <View style={{height:80}}>
                <ProgressViewComponent style={{flex:1,marginLeft:20,marginRight:20}} progress={this.state.progressPercent/100}/>
                <Button style={{flex:1}} title={progressPercent == 0?'开始下载':progressPercent==100?'播放下载的文件':'下载'+progressPercent.toString()+'%'} onPress={this._startDownload}/>
              </View>
              {this.state.showVideo==false?null:<Video style={{flex:1,marginTop:50}} source={this.state.videourl}/>}
            </View>
            )
    }

} 