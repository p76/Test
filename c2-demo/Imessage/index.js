'use strict'

//系统组件
import React, { Component } from 'react';

import {
  Router,
  Actions,
  Scene,
  Modal,
  TabBar,
  VectorIcons,
  UserInfo,
  UUID
} from 'c2-mobile';

import {Provider, connect} from 'react-redux'

//IM
import {
  C2IMClient,
  C2IMChatSession,
  C2IMChatSessionInfo,
  C2IMChatSessionAllMembers,
  C2IMChatSessionNameChange,
  C2IMChatSessionAvatarChange,
  C2IMChatImageList,
  C2IMChatFileList,
  C2IMChatLiveList,
  C2IMChatFileDownload,
  C2IMChatGroupList,
  C2IMSelectOrganization,
  C2IMSelectContacts,
  C2IMContactsDetail,
  C2IMImagePreview
} from 'c2-mobile-imessage';

//通讯录
import {
  C2ABContactsDetail,
  C2ABContactsIndex,
  C2ABOrganizationList,
  C2ABSelectOrganization
} from 'c2-mobile-contacts';

//即时通讯
import ImessageDemo from './Tab';
import ImessageLogin from './Login';

//创建IM Redux store
//注：如果app自身使用了redux，需要合并
import createStore from './createStore';
const store = createStore();

const RouterWithRedux = connect()(Router);

//需要把IM、通讯录的路由注册进自己的路由里面
const scenes = Actions.create(
  <Scene key="modal" component={Modal} >
    <Scene key="root">
      <Scene key="ImessageLogin" component={ImessageLogin} title="即时通讯登录" initial/>
      <Scene key="ImessageDemo" component={ImessageDemo} title="即时通讯Demo" hideNavBar={true}/>
  
      <Scene key="C2IMChatSession" component={C2IMChatSession} title="会话" hideNavBar={true}/>
      <Scene key="C2IMChatSessionInfo" component={C2IMChatSessionInfo} title="会话详情" hideNavBar={true}/>
      <Scene key="C2IMChatSessionAllMembers" component={C2IMChatSessionAllMembers} title="会话所有成员" hideNavBar={true}/>
      <Scene key="C2IMChatSessionNameChange" component={C2IMChatSessionNameChange} title="修改会话名称" hideNavBar={true}/>
      <Scene key="C2IMChatSessionAvatarChange" component={C2IMChatSessionAvatarChange} title="修改头像" hideNavBar={true}/>
      <Scene key="C2IMChatImageList" component={C2IMChatImageList} title="群相册" hideNavBar={true}/>
      <Scene key="C2IMChatFileList" component={C2IMChatFileList} title="群文件" hideNavBar={true}/>
      <Scene key="C2IMChatLiveList" component={C2IMChatLiveList} title="群直播" hideNavBar={true}/>
      <Scene key="C2IMChatGroupList" component={C2IMChatGroupList} title="我的群列表" hideNavBar={true}/>
      <Scene key="C2IMChatFileDownload" component={C2IMChatFileDownload} title="文件下载" hideNavBar={true}/>
      <Scene key="C2IMImagePreview" direction="vertical" component={C2IMImagePreview} title="图片预览" hideNavBar={true}/>

      <Scene key="C2ContactsDetail" component={C2IMContactsDetail} title="联系人详情(IM版本)" hideNavBar={true}/>
      <Scene key="C2ContactsIndex" component={C2ABContactsIndex} title="通讯录" hideNavBar={true}/>
      <Scene key="C2ABOrganizationList" component={C2ABOrganizationList} title="组织机构" hideNavBar={true}/>
      <Scene key="C2SelectedContact" direction="vertical" component={C2IMSelectContacts} title="选择联系人(IM版本)" panHandlers={null} hideNavBar={true}/>
      <Scene key="C2ABSelectOrganization" component={C2ABSelectOrganization} title="选择组织机构" panHandlers={null} hideNavBar={true}/>
    </Scene>
  </Scene>
  
);

export default class Index extends Component{

    render(){
        return(
          <Provider store={store}>
            <RouterWithRedux scenes={scenes}/>
          </Provider>
        )
    }
}