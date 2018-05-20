'use strict'

//系统组件
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';

import {VectorIcon} from 'c2-mobile';

export default class AnimationPri extends Component{

    constructor(props) {
      super(props);
      
      this._dismissInfomation = this._dismissInfomation.bind(this);
      this._getInfo = this._getInfo.bind(this);
      this._animatedEndBlock = this._animatedEndBlock.bind(this);

      this.state = {
          infoShow:true,
          fadeAnim: new Animated.Value(1),
      }
    }

    componentDidMount() {

    }

    _dismissInfomation(){
      Animated.parallel([    
        Animated.timing(this.state.fadeAnim,{
            toValue: 0,
            duration: 500,
        })
      ]          
      ).start(); 

      setTimeout(  
        () => this._animatedEndBlock(),  
        500  
      );       
    }

    _animatedEndBlock(){
        this.setState({infoShow: false}) 
        LayoutAnimation.spring();
    }

    _getInfo(){
        return(
            <Animated.View style={{marginTop:10,padding:10,backgroundColor:'pink',opacity:this.state.fadeAnim}}>
              <Text allowFontScaling={false}>注意:请尽量使用Animated动画库，使用LayoutAnimation动画库做细节动画可能会导致UI跳转动画错乱。</Text>
              <TouchableOpacity onPress={()=>this._dismissInfomation()}>
                <VectorIcon name="close" style={{flex:1,textAlign:'right',color:'white',fontSize:24}}/>
              </TouchableOpacity>
            </Animated.View>
        )
    }

    render(){
        return(
          <ScrollView style={styles.container}>
            {this.state.infoShow?this._getInfo():null}
            <View style={{marginTop:10,padding:10,backgroundColor:'pink'}}>
              <Text allowFontScaling={false}>注意:请尽量使用Animated动画库，使用LayoutAnimation动画库做细节动画可能会导致UI跳转动画错乱。</Text>
              <TouchableOpacity onPress={()=>alert('这个不能删除')}>
                <VectorIcon name="close" style={{flex:1,textAlign:'right',color:'white',fontSize:24}}/>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:64,
        flexDirection:'column',
    },
    sectionContainer:{
        height:40,
        backgroundColor:'#4285f4',
    }
})