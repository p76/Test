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

import {Fetch,UserInfo} from 'c2-mobile';

export default class HttpRequest extends Component{

    constructor(props) {
      super(props);

      this._requestData = this._requestData.bind(this);

      this.state = {
          httpResult:'',
      }

    }

    _requestData(){

       //Http请求
       Fetch.postJson('/ws/taskList',{search:{Closed:false,Done:false,NotDone:true,bug:false,creator:null,projects:[],users:[{userName:UserInfo.userName}],week:{name:'all'}},pageable:{pageSize:60,pageIndex:1}})
       .then((response) => {
           alert('请求成功');
         this.setState({
             httpResult:JSON.stringify(response),
         })
       }).catch((error)=>{
           alert('请求出错');
       });
    
    //自定义header方法
    //    var parmas = {
    //        url:"/ws/taskList",
    //        header:{
    //            test:'sdfsdfsd'
    //        }
    //    }
    //    Fetch.postJson(parmas,{search:{Closed:false,Done:false,NotDone:true,bug:false,creator:null,projects:[],users:[{userName:UserInfo.userName}],week:{name:'all'}},pageable:{pageSize:60,pageIndex:1}})
    //    .then((response) => {
    //        alert('请求成功');
    //      this.setState({
    //          httpResult:JSON.stringify(response),
    //      })
    //    }).catch((error)=>{
    //        alert('请求出错');
    //    });

    }

    render(){

        if(!UserInfo.userName){
            alert('请先进行SSOAuth登录再进入');
            return <View/>
        }
        return(
            <ScrollView style={styles.container}>
              <TouchableOpacity style={styles.requestButton} onPress={()=>this._requestData()}>
                <Text allowFontScaling={false} style={{margin:10,color:'white'}}>发起Http请求</Text>
              </TouchableOpacity>
              <Text>{this.state.httpResult}</Text>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:Platform.OS=='ios'?64:40,
    },
    requestButton:{
        alignSelf:'center',
        marginTop:20,
        borderRadius:5,
        backgroundColor:'#4285f4',
    }
})
