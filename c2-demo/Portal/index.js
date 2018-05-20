'use strict'

//系统组件
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Modal,
  StyleSheet,
  Platform,
  Dimensions,
  Navigator,
} from 'react-native';

import {Portal,Fetch} from 'c2-mobile';//导航路由
import pageInteraction from '../pageInteraction/index1';

const diyApp = [{
			"id": "mineApp",
			"title": "我的应用",
			"applications": [
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "rgb(254,205,80)","iconname": "cloud_download","id": "download","recommend": true,"sort": 1,"title": "下载","url": "https://www.baidu.com"},
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "black","iconname": "edit","id": "edit","recommend": true,"sort": 0,"title": "编辑","url": "http://www.baidu.com"},
                {"defalut": true,"eventtype": "native","fontcolor": "black","iconcolor": "red","iconname": "my_location","id": "localtion","recommend": false,"sort": 1,"title": "定位","url": "123"},
                {"defalut": true,"eventtype": "native","fontcolor": "black","iconcolor": "black","iconname": "brightness_4","id": "brightness_4","recommend": false,"sort": 0,"title": "夜间模式","url": "night"}, 
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "black","iconname": "brightness_5","id": "brightness_5","recommend": false,"sort": 0,"title": "白天模式","url": "http://wenwen.sogou.com/z/q229375145.htm"}, 
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "#7FFF00","iconname": "directions_bike","id": "bike","recommend": false,"sort": 0,"title": "骑行","url": "http://www.baidu.com"},
                {"defalut": true,"eventtype": "externalNative","fontcolor": "black","iconcolor": "blue","iconname": "payment","id": "alipay","recommend": false,"sort": 0,"title": "支付宝","url": "{\"android\":\"alipay://\",\"ios\":\"alipay://\",\"block\":\"http://www.alipay.com\"}"},
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "#FFA500","iconname": "favorite","id": "favorite","recommend": false,"sort": 0,"title": "收藏","url": "http://www.baidu.com"},
                {"eventtype": "native","fontcolor": "#02a8f3","iconcolor": "#02a8f3","iconname": "airplanemode_active","id": "airplane","sort": 0,"title": "机票","url": "airplane"},
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "#FF0000","iconname": "group_work","id": "youtube","recommend": false,"sort": 0,"title": "Youtube","url": "http://www.youku.com"},
                {"defalut": true,"eventtype": "externalNative","fontcolor": "black","iconcolor": "#02a8f3","iconname": "question_answer","id": "qqmsn","recommend": false,"title": "QQ","url": "{\"android\":\"mqq://\",\"ios\":\"mqqwpa://\",\"block\":\"http://im.qq.com\"}"
			}]
		}]

const allApp = [{
			"id": "recommend",
			"title": "热门推荐",
			"applications": [
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "rgb(254,205,80)","iconname": "cloud_download","id": "download","recommend": true,"sort": 1,"title": "下载","typeId": {"id": "money","sort": 1,"title": "金融应用"},"url": "http://www.baidu.com"}, 
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "black","iconname": "edit","id": "edit","recommend": true,"sort": 0,"title": "编辑","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "http://www.baidu.com"}
            ]
		}, {
			"id": "life",
			"title": "生活应用",
			"applications": [
                {"defalut": false,"eventtype": "externalNative","fontcolor": "black","iconcolor": "green","iconname": "camera","id": "camera","recommend": false,"sort": 0,"title": "相机","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "{\"android\":\"sms://\",\"ios\":\"sms://\",\"block\":\"http://www.baidu.com\"}"}, 
                {"defalut": true,"eventtype": "native","fontcolor": "black","iconcolor": "red","iconname": "my_location","id": "localtion","recommend": false,"sort": 1,"title": "定位","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "123"}, 
                {"defalut": true,"eventtype": "native","fontcolor": "black","iconcolor": "black","iconname": "brightness_4","id": "brightness_4","recommend": false,"sort": 0,"title": "夜间模式","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "night"}, 
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "black","iconname": "brightness_5","id": "brightness_5","recommend": false,"sort": 0,"title": "白天模式","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "http://wenwen.sogou.com/z/q229375145.htm"},
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "#7FFF00","iconname": "directions_bike","id": "bike","recommend": false,"sort": 0,"title": "骑行","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "http://www.baidu.com"}, 
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "#FFA500","iconname": "favorite","id": "favorite","recommend": false,"sort": 0,"title": "收藏","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "http://www.baidu.com"}, 
                {"defalut": true,"eventtype": "web","fontcolor": "black","iconcolor": "#FF0000","iconname": "group_work","id": "youtube","recommend": false,"sort": 0,"title": "Youtube","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "http://www.youku.com"},
                {"defalut": true,"eventtype": "externalNative","fontcolor": "black","iconcolor": "#02a8f3","iconname": "question_answer","id": "qqmsn","recommend": false,"title": "QQ","typeId": {"id": "life","sort": 2,"title": "生活应用"},"url": "{\"android\":\"mqq://\",\"ios\":\"mqqwpa://\",\"block\":\"http://im.qq.com\"}"}
            ]
		}, {
			"id": "money",
			"title": "金融应用",
			"applications": [
                {"defalut": true,"eventtype": "externalNative","fontcolor": "black","iconcolor": "blue","iconname": "payment","id": "alipay","recommend": false,"sort": 0,"title": "支付宝","typeId": {"id": "money","sort": 1,"title": "金融应用"},"url": "{\"android\":\"alipay://\",\"ios\":\"alipay://\",\"block\":\"http://www.alipay.com\"}"
			}]
		}]

export default class PortalNavigator extends Component{
    
    //这里只是
    render(){
        return(
            <Navigator
            initialRoute={{name: '基础页面', index: 0, component:PortalDemo}}
            configureScene={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
            renderScene={(route, navigator) => {
                  let RComponent = route.component;
                  return <RComponent {...route} navigator={navigator} />;
               }
            }
           />   
        )
    }
}

class PortalDemo extends Component{

    constructor(props){
        super(props);

        this._requestRemoteData = this._requestRemoteData.bind(this);
        
        this.state = {
            allApplications:allApp,
            diyApplications:diyApp,
        }
    }

    componentDidMount(){
       Fetch.mainUrl='http://172.16.25.45:8080';

    //    this._requestRemoteData();
    }

    _requestRemoteData(){
       //Http请求
       Fetch.getJson('/getMobilePortalList?userId=xiaoquan',{})
       .then((response) => {
         this.setState({
             diyApplications:response.result.customPortal,
             allApplications:response.result.allPortal
         })
       }).catch((error)=>{
           alert('请求出错');
       });
    }

    _updateCustomApps(apps){
        this.setState({
            diyApplications:apps
        })
    }

    render(){
        return(
            <View style={{flex:1}}>
            <View style={{height:Platform.OS ==='ios'?64:54,backgroundColor:'white',borderColor:'#d7d7d7',borderBottomWidth:0.5}}>
              <Text allowFontScaling={false} style={{alignSelf:'center',marginTop:Platform.OS ==='ios'?30:25,fontSize:18}}>门户演示</Text>
            </View>
            <ScrollView style={styles.container}>              
                <Portal
                 customApps={this.state.diyApplications}
                 allApps={this.state.allApplications}
                 navigator={this.props.navigator} 
                 updateCustomApps={this._updateCustomApps.bind(this)} 
                 components={{
                     "airplane":pageInteraction
                    }}/>              
            </ScrollView>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        backgroundColor:'#edecec',
    },
})