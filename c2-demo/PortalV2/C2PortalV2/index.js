'use strict'

//系统组件
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ListView,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

import {VectorIcon} from 'c2-mobile';

export default class C2Portal extends Component{

    constructor(props) {
      super(props);

      this._getRow = this._getRow.bind(this);

    }

    _getRow(pp,ii,rowData){

        var itemTemp = [];
        for(var nn = 0 ;nn < this.props.lineItemNum ;nn++){
            if(rowData[nn]){
                itemTemp.push(
                  <TouchableOpacity key={pp-ii-nn} style={{flex:1,marginTop:10,paddingLeft:10,marginBottom:10,paddingRight:10,height:50}} onPress={()=>alert('haha')}>
                    <VectorIcon name={rowData[nn].name} style={{flex:1,color:'#757575',textAlign:'center',fontSize:24}}/>
                    <Text allowFontScaling={false} style={{flex:1,textAlign:'center',fontSize:10}}>{rowData[nn].title}</Text>
                  </TouchableOpacity>
                )
                continue;
            }
            itemTemp.push(
                  <View key={pp-ii-nn} style={{flex:1,paddingLeft:10,paddingRight:10,height:50}}/>
            )
        }
        return (
            <View key={pp-ii} style={{flexDirection:'row'}}>
              {itemTemp}
            </View>
        );
        
    }

    _getPageView(pp,dataBlob){
        var LineViewTemp = [];
        for(var ii = 0; ii < Math.ceil(dataBlob.length/this.props.lineItemNum) ; ii++){
          var curCount = ii*this.props.lineItemNum;
          var itemTemp = [];
          for(var tt = 0 ; tt < Math.min(this.props.lineItemNum,dataBlob.length-curCount) ; tt++){
            itemTemp.push(dataBlob[curCount+tt]);
          }
          LineViewTemp.push(this._getRow(pp,ii,itemTemp));
        }

        return (
            <View key={pp} style={styles.collectionContainer}>
              {LineViewTemp}
            </View>
        );
    }

    _getPageGroupView(){
        var pageViewTemp = [];
        for(var pp = 0 ; pp < this.props.itemDataSource.length ; pp++){
            pageViewTemp.push(
                this._getPageView(pp,this.props.itemDataSource[pp])
            )
        }
        return pageViewTemp;
    }

    _getPageControl(count:number,selected:number){
        
        var controlItem = [];
        for(var kk = 0 ; kk < count ; kk++){
            controlItem.push(
              <VectorIcon key={'page-'+kk} name={kk==selected?'radio-button-checked':'radio-button-unchecked'} style={{color:'#757575',textAlign:'center',fontSize:12}}/>
            )
        }
        return controlItem

    }

    render(){
        return(
            <View>
              <ScrollView style={styles.scrollContainer} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
                {this._getPageGroupView()}
              </ScrollView>
              <View style={{flexDirection:'row',justifyContent:'center',paddingTop:5,paddingBottom:5,backgroundColor:'#cdcdcd',}}>
                {this._getPageControl(this.props.itemDataSource.length,0)}
              </View>
            </View>
        )
    }

}

C2Portal.defaultProps = {
    lineItemNum:4
}

let styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS ==='ios'?64:64,
        backgroundColor:'white',
    },
    scrollContainer:{
        flexDirection:'row',
        backgroundColor:'#edecec',
    },
    collectionContainer:{
        flex:1,
        width:Dimensions.get('window').width,
        backgroundColor:'#edecec',
    },
})