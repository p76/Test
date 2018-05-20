'use strict'

//系统组件
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

// import {Calendar} from 'c2-mobile';
import Calendar from './Calendar';

export default class PerpetualCalendar extends Component{

    constructor(props) {
      super(props);
      

    }

    render(){
        return(
          <ScrollView style={styles.container}>
            <Calendar style={{flex:1}} allowSwitch ={false} showModel={'Month'}/>
          </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:64,
      flexDirection:'column',
    }
})