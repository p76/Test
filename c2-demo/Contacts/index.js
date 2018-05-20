'use strict'

//系统组件
import {AppRegistry} from 'react-native';
import React, { Component } from 'react';

import {
  Config,
  Router,
  Actions,
  Scene,
  UserInfo
} from 'c2-mobile';

import {Provider, connect} from 'react-redux'

//通讯录
import {
  C2ABContactsDetail,
  C2ABSelectOrganization
} from 'c2-mobile-contacts';

//登录
import ContactsLogin from './Login';
//主Home Tab页
import Tab from './Tab';

//创建IM Redux store
//注：如果app自身使用了redux，需要合并
import createStore from './createStore';
const store = createStore();

const RouterWithRedux = connect()(Router);

//需要把IM、通讯录的路由注册进自己的路由里面
const scenes = Actions.create(
    <Scene key="root">  
      <Scene key="Tab" component={Tab} title="选择联系人" panHandlers={null} hideNavBar={true}/>
      <Scene key="C2ABSelectOrganization" component={C2ABSelectOrganization} title="选择组织机构" panHandlers={null} hideNavBar={true}/>
      <Scene key="C2ABContactsDetail" component={C2ABContactsDetail} title="联系人详情" panHandlers={null} hideNavBar={true}/>
  </Scene>
  
);

export default class Index extends Component{

  constructor(props){
    super(props);
    //初始化授权信息
    UserInfo.accesstoken=props.access_token;
    UserInfo.refreshtoken=props.refresh_token;
  }
  
  render(){
    return(
      <Provider store={store}>
        <RouterWithRedux scenes={scenes}/>
      </Provider>
      )
  }
}