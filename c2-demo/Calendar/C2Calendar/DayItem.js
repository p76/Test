'use strict'
import {
    View
} from 'react-native';

import React,{Component} from 'react';

class DayItem extends Component{
    
    constructor(props){
        super(props);
        
    }

    render(){
      //预处理样式数据
      var dayId = data.id;
      //日子数字颜色 三目运算  条件一  是否是当天且被选中 || 被选中   条件二  是当天但没被选中    条件三  是否是当月

      var dayColor = (data.isToday && this.state.selectGroup[dayId]) || this.state.selectGroup[dayId] ?this.state.daySelectedTintColor:data.isToday && !this.state.selectGroup[dayId]?this.state.currentDayBackgroundColor:!data.isInMonth?this.state.nonMonthTintColor:data.defaultTintColor;

  //判断数字样式
      var dayItem = (
        <Text style={{flex:1,alignSelf:'center',marginTop:11,height:24.5,textAlign:'center',fontSize:18,color:dayColor}}>{data.day}</Text>
      );
      if (this.state.selectGroup[dayId]) {
      //日子数字背景颜色
        var dayBKcolor = data.isToday==true?this.state.currentDayBackgroundColor:this.state.selectGroup[dayId]?this.state.selectedDayBackgroundColor:'white';
        dayItem = (
           <View style={{flexDirection:'row',alignSelf:'center',marginTop:11,marginBottom:3,width:22,height:22,borderRadius:11,backgroundColor:dayBKcolor,overflow:'hidden'}}>
              <Text style={{flex:1,alignSelf:'center',textAlign:'center',fontSize:18,color:dayColor}}>{data.day}</Text>
           </View>
        )
      }

//判定是否需要加入工时Item
      var workTimeItem = null;
      if (this.state.isShowWorkTime && this.state.timeGroup[dayId] != null) {
        workTimeItem = (
           <View style={{flexDirection:'row',alignSelf:'center',marginBottom:11,borderRadius:2,backgroundColor:this.state.workTimeBackgroundColor,overflow:'hidden'}}>
              <Text style={{marginLeft:7,marginRight:7,textAlign:'center',fontSize:12,color:'white'}}>{this.state.timeGroup[dayId]}</Text>
           </View>
         )
      }

      return(
        <TouchableOpacity key={'day'+dayId} style={[styles.CalendarDayItem,{borderBottomWidth:0.5}]} onPress={data.handler} disabled={this.state.userinterfaceStatus}>
           {dayItem}
           {workTimeItem}
        </TouchableOpacity>
      )
    }
}

module.exports = DayItem;