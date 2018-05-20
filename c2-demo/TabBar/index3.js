'use strict'

//系统组件
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import {TabBar} from 'c2-mobile';

import Tab1 from './tab1';
import Tab2 from './tab2';
export default class Index3 extends Component{

    constructor(props) {
      super(props);
    }

    render(){
        return(
          <View style={{ flex: 1 }}>
            <TabBar textColorSelected="#4285f4" textColor="#888888" >
              <TabBar.Item
                icon="ios-list-box-outline"
                selectedIcon="ios-list-box"
                title="tab1"
                badge={3}
              >
                <Tab1 {...this.props} />
              </TabBar.Item>
              <TabBar.Item
                icon="ios-calendar-outline"
                selectedIcon="ios-calendar"
                title="tab2"
              >
                <Tab2 {...this.props} />
              </TabBar.Item>
            </TabBar>
          </View>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#4285f4',
    }
})