'use strict'

//系统组件
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ListView,
  StyleSheet,
  Platform,
} from 'react-native';

import {VectorIcon} from 'c2-mobile';

const collectionCellDataSource = [
    'download_outline',
    'cloud',
    'flight-land',
    'fingerprint',
    'payment',
    'find-in-page',
    'language',
    'loyalty'
    ]

export default class FontIcon extends Component{

    constructor(props) {
      super(props);

      this.state = {
        dataSource:this._getDataSource(collectionCellDataSource),
      };
    }

    _getDataSource(data){
      //初始化对象
      var rowID = [];

      var getRowData = (dataBlob, sectionID, rowID) => {
        var curCount = parseInt(rowID)*3;
        var temp = [];
        for(var ii = 0 ; ii < Math.min(3,dataBlob[sectionID].length-curCount) ; ii++){
            temp.push(dataBlob[sectionID][curCount+ii]);
        }
        return temp;

      };
 
      let dataSource = new ListView.DataSource({
                            getRowData: getRowData,
                            rowHasChanged: (row1, row2) => row1 !== row2,
                      });

      var lineNum = Math.ceil(data.length/3);
      for(var nn = 0 ; nn < lineNum ; nn++){
          rowID.push(nn);
      }
     
      return dataSource.cloneWithRows(data,rowID)
    }

    _renderRow(rowData: any, sectionID: string, rowID: string){

        var temp = [];
        for(var ii = 0 ;ii < 3 ;ii++){
            if(rowData[ii]){
                temp.push(
                  <View key={rowID-ii} style={{flex:1,marginTop:10,paddingLeft:10,marginBottom:10,paddingRight:10,height:50}}>
                    <VectorIcon key={rowID} name={rowData[ii]} style={{flex:1,color:'#757575',textAlign:'center',fontSize:24}}/>
                    <Text allowFontScaling={false} style={{flex:1,textAlign:'center',fontSize:10}}>{rowData[ii]}</Text>
                  </View>
                )
                continue;
            }
            temp.push(
                  <View key={rowID-ii} style={{flex:1,paddingLeft:10,paddingRight:10,height:50}}/>
            )
        }
        return (
            <View style={{flexDirection:'row'}}>
              {temp}
            </View>
        );
    }

    render(){
        return(
            <ListView
            style={styles.container}
            ref={'listView'}
            enableEmptySections={true}
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            pageSize={4}
            />
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:Platform.OS ==='ios'?64:40,
        backgroundColor:'#edecec',
    },
})