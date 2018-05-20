'use strict'

import {
  View,
  Text,
  WebView,
  StyleSheet,
  Platform,
}from'react-native';

import React, {Component} from 'react';
import {SegmentedControl} from 'c2-mobile'

class Segmented extends Component {

  constructor(props) {
    super(props);

  }

  _SelectPlanItem(selected){

  }

  render(){

    return(
      <View style={{flex:1,paddingTop:Platform.OS=='ios'?64:40,}}>
        <SegmentedControl
        style={{flexDirection:'ff'}}
        ref={'C2SegmentedControl'} 
        itemDatas={[{name:'本周任务'},{name:'下周计划'}]} 
        hasChanged={this._SelectPlanItem.bind(this)}
        />
      </View>
    )
  }

}

let styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#edecec',
  }
})

module.exports = Segmented;
