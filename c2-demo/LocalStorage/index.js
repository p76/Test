'use strict'

//系统组件
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  AsyncStorage,
} from 'react-native';

export default class LocalStorage extends Component{

    constructor(props) {
      super(props);

      this._onChangeText = this._onChangeText.bind(this);
      this._saveValue = this._saveValue.bind(this);
      this._clearValue = this._clearValue.bind(this);

      this.state = {
          textValue:'12312',
          placeholder:'',
      }
    }

    componentWillMount(){
        this._initTextValue();
    }

    _onChangeText(text){
        this.setState({
            textValue:text,
        })
    }

    _initTextValue(){
        AsyncStorage.getItem('testkey', (err, result) => {
            if(result){
                var resultOB = JSON.parse(result);
                this.setState({
                  placeholder:resultOB.textValue
                })
            }
        });
    }

    _saveValue(){
        var tempItem = {textValue:this.state.textValue}
        AsyncStorage.setItem('testkey',JSON.stringify(tempItem) , () => {
            alert('保存成功');
        });
    }

    _clearValue(){
        AsyncStorage.clear(() => {
            alert('清除成功');
        });
    }

    render(){
        return(
            <ScrollView style={styles.container}>
              <TextInput placeholder={'本地已存数据'+this.state.placeholder} onChangeText={this._onChangeText} style={styles.textinput}/>
              <View style={{flexDirection:'row',}}>
                <TouchableOpacity style={styles.button} onPress={()=>this._saveValue()}>
                  <Text allowFontScaling={false} style={{flex:1,margin:10,color:'white',textAlign:'center'}}>保存至本地数据</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this._clearValue()}>
                  <Text allowFontScaling={false} style={{flex:1,margin:10,color:'white',textAlign:'center'}}>清除本地数据</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:Platform.OS=='ios'?64:40,
    },
    textinput:{
        flex:1,
        height:40,
        margin:20,
        borderColor:'#edecec',
        borderWidth:1,
        borderRadius:5,
    },
    button:{
        flex:1,
        alignSelf:'center',
        margin:20,
        borderRadius:5,
        backgroundColor:'#4285f4',
    }
})