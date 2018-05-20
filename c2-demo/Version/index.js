'use strict'

import{
    View,
    Text,
    Platform,
} from 'react-native';

import{

    Version,
}from 'c2-mobile';

import React,{Component} from 'react';
export default class DownloadFile extends Component{

    constructor(props){
        super(props)

        this.state = {
            version:{
                name:'',
                version:0,
                build:0,
                brand:'',
                device_type:''
            },
        }

        Version.getSystemInfo()
        .then((response)=>{
            this.setState({
                version:response
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }



    render(){
        return (
            <View style={{flex:1,marginTop:100}}>
            <Text>名称:<Text>{this.state.version.name}</Text></Text>
            <Text>版本:<Text>{this.state.version.version}</Text></Text>
            <Text>构建版本:<Text>{this.state.version.build}</Text></Text>
            <Text>设备品牌:<Text>{this.state.version.brand}</Text></Text>
            <Text>设备类型:<Text>{this.state.version.device_type}</Text></Text>
            </View>
            )
    }

} 