'use strict'

//系统组件
import React, { Component } from 'react';

import {Router,Actions,Scene} from 'c2-mobile';

//业务组件
import Index from './navigator';

//基础演示
//跨页面交互
import Index1 from './pageInteraction/index1';
import Index2 from './pageInteraction/index2';
//远程数据请求
import HttpRequest from './HttpRequest';
//数据持久化
import LocalStorage from './LocalStorage';

//C2业务组件演示
import SSOAuth from './SSOAuth';
import UserInfo from './SSOAuth/userInfo';

//C2组件演示

//Tabbar组件
import TabBar from './TabBar/index3';
//普通Video组件
import Video from './Video';
//字体图标
import FontIcon from './FontIcon';
//门户
import Portal from './Portal';
import PortalV2 from './PortalV2';
//下拉菜单
import OptionsMenu from './OptionsMenu/';
//H5网页与APP交互通讯
import UIWebAlternation from './UIWebAlternation';
//日历
import PerpetualCalendar from './Calendar';
//Tab滑动页
import SegmentedControl from './SegmentedControl';

//C2 Api演示
//强调提示
import Alert from './Alert';
//ActionSheet单选
import ActionSheet from './ActionSheet';
//信息提示
import Toast from './Toast';
//文件管理
import FileManager from './FileManager/';
import FileManager_fileUpload from './FileManager/file_upload';
import FileManager_filedownload from './FileManager/file_download';
import FileManager_open from './FileManager/file_open';
//相机
import CameraManager from './Camera/';
//图片选择器
import ImagePickerManager from './ImagePicker/';
//调用系统短信
import MSGManager from './MSG';
//获得系统/设备相关信息
import SystemVersion from './Version';

//扩展模块
//即时通讯
// import ImessageDemo from './Imessage';
// import ImessageLogin from './Imessage/Login';

//动画
import AnimationPri from './Animation';
import AnimationPro from './Animation/animationPro';

//创建全局路由
const scenes = Actions.create(
  <Scene key="root">
    <Scene key="Index" component={Index} title="Index"/>

    <Scene key="Index1" component={Index1} title="Index1"/>
    <Scene key="Index2" component={Index2} title="Index2"/>
    <Scene key="HttpRequest" component={HttpRequest} title="Http请求"/>
    <Scene key="LocalStorage" component={LocalStorage} title="数据持久化"/>

    <Scene key="SSOAuth" component={SSOAuth} title="平台配套SSO登录"/>
    <Scene key="UserInfo" component={UserInfo} title="用户信息"/>

    <Scene key="TabBar" component={TabBar} title="TabBar(Tab)" hideNavBar={true}/>
    <Scene key="Video" component={Video} title="视频播放"/>
    <Scene key="FontIcon" component={FontIcon} title="字体图标"/>
    <Scene key="Portal" component={Portal} title="门户组件" hideNavBar={true}/>
    <Scene key="PortalV2" component={PortalV2} title="门户组件V2"/>
    <Scene key="OptionsMenu" component={OptionsMenu} title="下拉菜单/滚筒菜单"/>
    <Scene key="UIWebAlternation" component={UIWebAlternation} title="网页数据交互"/>
    <Scene key="UIWebAlternation1" component={UIWebAlternation} title="网页数据交互1"/>
    <Scene key="PerpetualCalendar" component={PerpetualCalendar} title="万年历"/>
    <Scene key="SegmentedControl" component={SegmentedControl} title="Tab切换"/>

    <Scene key="Alert" component={Alert} title="Alert"/>
    <Scene key="Toast" component={Toast} title="信息/进度提示"/>
    <Scene key="ActionSheet" component={ActionSheet} title="ActionSheet单项选择器"/>
    <Scene key="FileManager" component={FileManager} title="文件管理"/>
    <Scene key="FileManagerfileUpload" component={FileManager_fileUpload} title="文件上传"/>
    <Scene key="FileManagerfiledownload" component={FileManager_filedownload} title="文件下载"/>
    <Scene key="FileManagerfileOpen" component={FileManager_open} title="打开文件"/>
    <Scene key="CameraManager" component={CameraManager} title="相机"/>
    <Scene key="ImagePickerManager" component={ImagePickerManager} title="图片选择器"/>
    <Scene key="MSGManager" component={MSGManager} title="调起系统UI发送短信"/>
    <Scene key="SystemVersion" component={SystemVersion} title="App信息"/>

    {/*<Scene key="ImessageLogin" component={ImessageLogin} title="即时通讯统一登录"/>
    <Scene key="ImessageDemo" component={ImessageDemo} hideNavBar title="即时通讯演示"/>*/}

    <Scene key="AnimationPri" component={AnimationPri} title="初级动画"/>
    <Scene key="AnimationPro" component={AnimationPro} title="高级动画"/>
  </Scene>
);

export default class Navigator extends Component{

    render(){
        return(
            <Router scenes={scenes}/>
        )
    }
}