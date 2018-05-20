'use strict'

import{
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Platform
}from 'react-native';
import React,{Component} from'react';

import {DropMenu} from 'c2-mobile';

export default class OptionsMenu extends Component{

    constructor(props){
        super(props);

        this._loadMoreData = this._loadMoreData.bind(this);

    }

    hasSend = true;

    _loadMoreData(){
        
        if(!this.hasSend){
            this.hasSend = false;
            return [{title:"test5",value:"test5"},{title:"test6",value:"test6"}]
        }else{
            return null;
        }
    }
    
    _renderButton(selectedOptions){
        if(selectedOptions.length > 0){

            var domTemp = [];
            for(var i = 0 ; i < selectedOptions.length ; i++){
                domTemp.push(<Text key={i}>{selectedOptions[i].title},</Text>);
            }
            return (
              <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              {domTemp}
              </View>
            )
        }
                return (
            <View style={{flex:1,alignSelf:'center'}}>
              <Text style={{textAlign:'center'}}>还没有选择，麻烦选择一下</Text>
            </View>
        )

    }

    render(){
        return(
            <ScrollView style={{flex:1,paddingTop:Platform.OS =='ios'?64:44,backgroundColor:'#4285f4'}}>
              <DropMenu
              renderRow={()=>{return(
                  <View style={{alignItems:'flex-start'}}>
                    <Text>123</Text>
                  </View>
              )}}
               selectedOption={(rowID,rowData)=>{}}
               loadMoreData={()=>this._loadMoreData()}
               options={[{title:"test1",value:"test1"},{title:"test2",value:"test2"},{title:"test3",value:"test3"},{title:"test4",value:"test4"}]} 
               style={{flexDirection:'row',height:50,margin:20,backgroundColor:'white',borderColor:'#841584',borderWidth:1}} 
              />
              <Text>模态弹出</Text>
              <DropMenu
               mode="Modal"
               selectedOption={(rowID,rowData)=>{}}
               loadMoreData={()=>this._loadMoreData()}
               options={[{title:"test1",value:"test1"},{title:"test2",value:"test2"},{title:"test3",value:"test3"},{title:"test4",value:"test4"}]} 
               style={{flexDirection:'row',height:50,margin:20,backgroundColor:'white',borderColor:'#841584',borderWidth:1}} 
              />
              <DropMenu
                renderButton={this._renderButton}
                selectedOption={(rowDatas)=>{console.log(rowDatas)}}//选完回调
                tintcolor={'#841584'}//主题色调值
                multiSelect={true}//是否多选
                loadMoreData={()=>this._loadMoreData()}//动态加载更多options，返回null关闭
                options={[{title:"test1",value:"test1"},{title:"test2",value:"test2"},{title:"test3",value:"test3"},{title:"test4",value:"test4"}]} //默认显示options
                style={{flexDirection:'row',height:50,margin:20,backgroundColor:'white',borderColor:'#841584',borderWidth:1}}//默认显示按钮的css
                renderFooter={(data)=>null}
              />
            </ScrollView>
        )
    }
}