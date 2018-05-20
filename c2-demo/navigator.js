'use strict'

//系统组件
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ListView,
  Platform,
  RefreshControl,
} from 'react-native';

import {Actions} from 'c2-mobile';//导航路由

const cellDataScource = [
    {
        sectionName:'基础演示',
        cellData:[
            {name:'跨页面交互',actions:()=>Actions.Index1()},
            {name:'远程数据请求',actions:()=>Actions.HttpRequest()},
            {name:'数据本地持久化',actions:()=>Actions.LocalStorage()},
            ],
    },
    {
        sectionName:'C2业务组件演示',
        cellData:[
            {name:'C2平台配套SSO登录',actions:()=>Actions.SSOAuth()},
            ],
    },
    {
        sectionName:'C2组件演示',
        cellData:[
            {name:'Tabbar(切换页)',actions:()=>Actions.TabBar()},
            {name:'Video(视频)',actions:()=>Actions.Video()},
            {name:'FontIcon(字体图标)',actions:()=>Actions.FontIcon()},
            {name:'Portal(门户)',actions:()=>Actions.Portal()},
            {name:'PortalV2(门户V2)',actions:()=>Actions.PortalV2()},
            {name:'options菜单(下拉单选、弹出滚筒)',actions:()=>Actions.OptionsMenu()},
            {name:'webview(网页<=>UI双向交互)',actions:()=>Actions.UIWebAlternation()},
            {name:'Calendar(万年历)',actions:()=>Actions.PerpetualCalendar()},
            {name:'SegmentedControl(顶部Tab切换)',actions:()=>Actions.SegmentedControl()},
            ],
    },
    {
        sectionName:'C2Api演示',
        cellData:[
            {name:'Alert(弹窗)',actions:()=>Actions.Alert()},
            {name:'Toast(信息/进度提示)',actions:()=>Actions.Toast()},
            {name:'ActionSheet(单项选择器)',actions:()=>Actions.ActionSheet()},
            {name:'本地文件管理(上传下载以及缓存管理)',actions:()=>Actions.FileManager()},
            {name:'Camera(相机)',actions:()=>Actions.CameraManager()},
            {name:'ImagePicker(图片选择器)',actions:()=>Actions.ImagePickerManager()},
            {name:'调用系统发送短信',actions:()=>Actions.MSGManager()},
            {name:'Version(App版本/设备信息)',actions:()=>Actions.SystemVersion()}
            ],
    },
    {
        sectionName:'C2模块演示(未集成对应模块之前请勿点击,以免APP崩溃)',
        cellData:[
            {name:'IMessage(即时通讯)',actions:()=>Actions.ImessageLogin()},
            {name:'VideoPro(流媒体/直播)',actions:()=>Actions.Video()},
            ],
    },
    {
        sectionName:'动画演示',
        cellData:[
            {name:'初级动画',actions:()=>Actions.AnimationPri()},
            // {name:'高级动画(手势动画)',actions:()=>Actions.AnimationPro()},
            ],
    }
]

export default class Index extends Component{

    constructor(props) {
      super(props);
      
      this.state = {
          dataSource:this._getDataSource(cellDataScource),
      }
    }

    _getDataSource(data){
      //初始化对象
      var sectionID = [];
      var rowID = [];

      var getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
      };
      var getRowData = (dataBlob, sectionID, rowID) => {
        var sectionData = dataBlob[sectionID];
        return sectionData['cellData'][rowID];
      };
 
      let dataSource = new ListView.DataSource({
                            getRowData: getRowData,
                            getSectionHeaderData: getSectionData,
                            rowHasChanged: (row1, row2) => row1 !== row2,
                            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                      });

      for(var ii in data){
        sectionID.push(ii);
        var cellData = data[ii].cellData;
        var tempRowID = [];
          for(var nn in cellData){
              tempRowID.push(nn);
          }
          rowID.push(tempRowID);
      }
     
      return dataSource.cloneWithRowsAndSections(data,sectionID,rowID)

    }

    _renderSectionHeader(sectionData, sectionID) {
      return (
        <View key={sectionData.sectionName} style={styles.sectionContainer}>
          <Text style={{padding:15,color:'white'}}>{sectionData.sectionName}</Text>
        </View>
      )
   }

  _renderRow(rowData: any, sectionID: string, rowID: string){
    var cellBKcolor = rowID%2?'#edecec':'white';
    return(
      <TouchableOpacity key={sectionID+'-'+rowID} style={{backgroundColor:cellBKcolor}} onPress={()=>rowData.actions()}>
        <Text style={{padding:15}}>{rowData.name}</Text>
      </TouchableOpacity>
    )

  }

    render(){
        return(
            <ListView
            style={styles.container}
            ref={'listView'}
            enableEmptySections={true}
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderSectionHeader={this._renderSectionHeader}
            renderRow={this._renderRow}
            pageSize={8}
            />
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:Platform.OS=='ios'?64:54,
        flexDirection:'column',
    },
    sectionContainer:{
        backgroundColor:'#4285f4',
    }
})