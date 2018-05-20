'use strict'

//系统组件
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ListView,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  Navigator,
} from 'react-native';

import C2PortalV2 from './C2PortalV2';//导航路由

const collectionCellDataSource = [
    [
        {id:'testid',type:0,name:'edit',title:'编辑',},
        {id:'testid',type:0,name:'brightness-4',title:'夜间模式',},
        {id:'testid',type:0,name:'brightness-5',title:'白天模式',},
        {id:'testid',type:0,name:'camera',title:'拍照',},
        {id:'testid',type:0,name:'cloud-download',title:'下载',},
        {id:'testid',type:0,name:'directions-bike',title:'骑行',},
        {id:'testid',type:0,name:'directions-walk',title:'步行',},
        {id:'testid',type:0,name:'timelapse',title:'计时',},
        {id:'testid',type:0,name:'filter-center-focus',title:'记录',},
        {id:'testid',type:0,name:'filter-drama',title:'云计算',},
    ],
    [
        {id:'testid',type:0,name:'cloud-download',title:'下载',},
        {id:'testid',type:0,name:'directions-bike',title:'骑行',},
        {id:'testid',type:0,name:'directions-walk',title:'步行',},
        {id:'testid',type:0,name:'timelapse',title:'计时',},
        {id:'testid',type:0,name:'filter-center-focus',title:'记录',},
        {id:'testid',type:0,name:'filter-drama',title:'云计算',},
    ]

]

export default class Portal extends Component{

    render(){
        return(
            <Navigator
            initialRoute={{name: 'My First Scene', index: 0, component:PortalDemo}}
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
    render(){
        return(
            <ScrollView style={styles.container}>
              <C2PortalV2 itemDataSource={collectionCellDataSource} navigator={this.props.navigator}/>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS ==='ios'?64:54,
        backgroundColor:'white',
    },
})