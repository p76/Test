'use strict'

import{
    View,
    Text,
    Image,
    Platform,
    TouchableOpacity,
} from 'react-native';

import{
    FileManager,
}from 'c2-mobile';

import React,{Component} from 'react';

export default class OpenSource extends Component{

    constructor(props){
        super(props)

        this.state = {
            defaultSource:null
        }
    }

    componentDidMount(){
        alert('请先修改工程，加入一个pdf／word文档下载地址');
        this._loadInitFile();
    }

    _loadInitFile(){
        var source = { uri: "http://image.tianjimedia.com/imagelist/2009/190/caq4z56jadof.pdf", fileName: "caq4z56jadof.pdf" };
        var params = {
            source:source,
            dirMode:FileManager.DirMode.cache,
            progress:(events)=>{
              console.log('demo文件正在下载:'+parseInt(events.completedUnitCount/events.totalUnitCount)+'%');
            }
        }
        FileManager.downloadFile(params).then((respones)=>{
            this.setState({
                defaultSource:respones,
            })
            alert('上传文件已准备就绪');
        }).catch((e)=>{
            alert('下载失败');
        });
    }
    
    _openFile(){
        if(this.state.defaultSource == null){
            alert('文件还在下载中');
        }
        var source = this.state.defaultSource;
        FileManager.openFile(source)
        .then((response)=>{
            console.log('success');
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render(){
        return (
            <View style={{flex:1,paddingTop:100}}>
                <TouchableOpacity style={{flex:1}} onPress={()=>this._openFile()} >
                  <Text style={{flex:1,textAlign:'center'}}>打开文件</Text>
                </TouchableOpacity>
            </View>
            )
    }

} 