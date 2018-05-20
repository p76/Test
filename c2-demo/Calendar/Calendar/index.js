'use strict'

import{
    View,
} from 'react-native';

import React,{Component} from 'react';

import moment from 'moment';

class Calendar extends Component{

    constructor(props){
        super(props);

        this.state = {
            itemWidth:0
        }
    }

    _print(event){
        console.log('布局:'+event.nativeEvent.layout.width)
        this.setState({
            width:event.nativeEvent.layout.width
        })
    }

    render(){
        return(
            <View onLayout={(event)=>{this._print(event)}}>
                <View style={{height:20,width:this.state.width,backgroundColor:'red'}}/>
            </View>
        )
    }
}

module.exports = Calendar;