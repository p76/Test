'use strict'
//全局路由
//系统组件
import React, { Component } from 'react';

import { Navigator, Portal, Actions } from 'c2-mobile';
//首页
import HomePage from './HomePage/HomePage';
import HomePageContent from './HomePage/Content/Content';
import VicePage from './VicePage/VicePage';
import ContentPage from './ContentPage/ContentPage';

//创建全局路由
export default class NavigatorDemo extends Component {
    _console(store) {
        console.log(store);
        Actions.pop();
        return true;
    }
    render() {
        return (
            <Navigator.Router backAndroidHandler={this._console} >
                <Navigator.Modal hideNavBar>
                    <Navigator.Stack key="launch" initial>
                        <Navigator.Scene key="HomePage" component={HomePage} title="今日头条" hideNavBar={true} />
                        <Navigator.Scene key="HomePageContent" component={HomePageContent} title="今日头条内页" hideNavBar={true} />
                        <Navigator.Scene key="VicePage" component={VicePage} title="新闻种类" hideNavBar={true} />
                        <Navigator.Scene key="ContentPage" component={ContentPage} title="新闻详情" hideNavBar={true} />
                    </Navigator.Stack>
                </Navigator.Modal>
            </Navigator.Router>
        )
    }
}