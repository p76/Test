
'use strict';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  PixelRatio,
  LayoutAnimation,
} from 'react-native';

import React, {Component} from 'react';

import moment from 'moment';

import DayItem from './DayItem';

class C2Calendar extends Component{

//***************************************************************
//                          组件Delegate
//***************************************************************
  constructor(props) {
    super(props);

    this.genCompleteDays = this.genCompleteDays.bind(this);
    this.SelectedDay = this.SelectedDay.bind(this);
    this.state={
      showDate:this.props.date?this.props.date:new Date(),
      weekData:['日','一','二','三','四','五','六',],
      daysData:[],
      showModel:this.props.showModel,
      userinterfaceStatus:false,
      isShowWorkTime:this.props.isShowWorkTime,
      isHiddenOtherWeek:this.props.isHiddenOtherWeek,
      isAnimation:this.props.isAnimation,
      allowSwitch:this.props.allowSwitch,
      workdayTintColor:this.props.workdayTintColor,
      weekEndTintColor:this.props.weekEndTintColor,
      nonMonthTintColor:this.props.nonMonthTintColor,
      daySelectedTintColor:this.props.daySelectedTintColor,
      workTimeBackgroundColor:this.props.workTimeBackgroundColor,
      currentDayBackgroundColor:this.props.currentDayBackgroundColor,
      selectedDayBackgroundColor:this.props.selectedDayBackgroundColor,
      timeGroup:this.props.timeGroup,
      selectGroup:this.props.selectGroup,
    }
  }


  //组件加载完成
    componentWillMount(){
      if (this.state.showModel == 'Month') {
        this.changeCalendarPickerTime(this.props.date?this.props.date:new Date());
      }else{
        var weekDaysData = this.genCompleteDays(this.props.date?this.props.date:new Date(),'Week');
        this.setState({
          daysData:weekDaysData,
        })
      }
    }



//选定日期回调
  onSelectDay(dayId){
    var day = parseInt(dayId);
    var curDate = this.state.showDate;
    var firstDate = new Date(curDate.getFullYear(),curDate.getMonth(),1);
    var seleDate = new Date(curDate.getFullYear(),curDate.getMonth(),day-firstDate.getDay()+1);
    this.setState({
      showDate:seleDate,
    })
    this.props.onSelectedDate(seleDate);
  }

//回调月视图与周视图显示模式改变
  hasChangeShowModel(text){
    if (this.state.allowSwitch) {
      if (this.props.hasChangeShowModel) {
        this.props.hasChangeShowModel(text);
      }
    }
  }

//切换月份回调
  hasChangeMonth(date){
    if (this.props.hasChangeMonth) {
      this.props.hasChangeMonth(date);
    }
  }
//***************************************************************
//                          组件事件部分
//***************************************************************

//向前推一个月
  toPreviousMonth(){
    var willShowDate = this.state.showDate;
    var year = willShowDate.getFullYear();
    var month = willShowDate.getMonth();
    month--;
    if (month==-1) {
      year--;
      month = 11;
    }
    willShowDate.setFullYear(year);
    willShowDate.setMonth(month);

    this.changeCalendarPickerTime(willShowDate);
  }

//向后推一个月
  toNextMonth(){
    var willShowDate = this.state.showDate;
    var year = willShowDate.getFullYear();
    var month = willShowDate.getMonth();
    month++;
    if (month==12) {
      year++;
      month = 0;
    }
    willShowDate.setFullYear(year);
    willShowDate.setMonth(month);

    this.changeCalendarPickerTime(willShowDate);
  }

//返回上一周
  toPreviousWeek(){
    var daysData = this.state.daysData.slice(0);
    var isNeedChangeMonth = true;
    var isNeedShowId = null;
    //遍历日历数据，将需要显示的周isShow更改为True
      for (var key in daysData) {
          if (daysData[key].isShow == true && key != "0") {
            daysData[key].isShow = false;
            isNeedShowId = parseInt(key);
            isNeedChangeMonth = false;
            break;
          }
      }
    if (isNeedShowId>0 && !isNeedChangeMonth) {
      (daysData[isNeedShowId-1]).isShow = true;
    }

    //判定是否已经到本月第一周需要切换月份
    if (isNeedChangeMonth) {
      var needDate = new Date(this.state.showDate.getFullYear(),this.state.showDate.getMonth()-1,1);
          daysData = this.genCompleteDays(needDate,'Month');
      for (var key in daysData) {
        if (key<daysData.length-1) {
          daysData[key].isShow = false;
        }
      }
      this.setState({
        showDate:needDate,
      })
      this.hasChangeMonth(needDate);
    }
    this.setState({
      daysData:daysData,
    })
  }

//切换到下一周
  toNextWeek(){
    var daysData = this.state.daysData.slice(0);
    var isNeedChangeMonth = true;
    var isNeedShowId = null;
    //遍历日历数据，将需要显示的周isShow更改为True
      for (var key in daysData) {
          if (daysData[key].isShow == true && key<daysData.length-1) {
            daysData[key].isShow = false;
            isNeedShowId = parseInt(key)+1;
            isNeedChangeMonth = false;
            break;
          }
      }
    if (isNeedShowId) {
      (daysData[isNeedShowId]).isShow = true;
    }

    //判定是否已经到本月最后一周需要切换月份
    if (isNeedChangeMonth) {
      var needDate = new Date(this.state.showDate.getFullYear(),this.state.showDate.getMonth()+1,1);
          daysData = this.genCompleteDays(needDate,'Month');
      for (var key in daysData) {
        if (key>0) {
          daysData[key].isShow = false;
        }
      }
      this.setState({
        showDate:needDate,
      })
      this.hasChangeMonth(needDate);
    }
    this.setState({
      daysData:daysData,
    })
  }

//改变月视图日历显示的时间
  changeCalendarPickerTime(date){

    var Days = this.genCompleteDays(date,'Month');
    // if (this.state.isAnimation) {
    //   LayoutAnimation.easeInEaseOut();
    // }
    this.setState({
      showModel:'Month',
      showDate:date,
      daysData:Days,
      timeGroup:{},
      selectGroup:{},
    });

//回调月份发生改变
    this.hasChangeMonth(date);
  }

  //刷新日历
  refreshCalendarPickerTime(){
    this.setState({
      daysData:this.state.daysData,
    })
  }

  //恢复月日历显示模式
  recoveryMonthModel(){
    var newDaysData = this.state.daysData.slice(0);
      for (var key in newDaysData) {
          var tempDict = newDaysData[key];
          tempDict.isShow = true;
          newDaysData[key] = tempDict;
      }

    // if (this.state.isAnimation) {
    //   LayoutAnimation.easeInEaseOut();
    // }

  //检查是否需要回调切换了视图模式
    if (this.state.showModel == 'Week') {
      this.hasChangeShowModel('Month');
    }

    this.setState({
      daysData:newDaysData,
      showModel:'Month',
    })
  }

  //刷新工时
  refreshCalendarPickerWorkedTime(calendarWorkedTime){

    var curDate = this.state.showDate;
    var firstDay = (new Date(curDate.getFullYear(),curDate.getMonth(),1)).getDay();
    var tempDict ={};
    for (var key in calendarWorkedTime) {
      tempDict[parseInt(key)+firstDay-1] = calendarWorkedTime[key];
    }
    this.setState({
      timeGroup:tempDict,
    });
  }

  //选定时间
  SelectedDay(dayID){
    var selectDict = {};
    selectDict[dayID] = true;
    var newDaysData = this.state.daysData.slice(0);
    var week = Math.floor(dayID/7);

//隐藏没被被选中的周，在允许月视图切换成周视图的情况下生效
    if (this.state.allowSwitch) {
      for (var key in newDaysData) {
        if (key != week) {
          var tempDict = newDaysData[key];
          tempDict.isShow = false;
          newDaysData[key] = tempDict;
        }
      }
    }

// //检查是否允许动画效果
//     if (this.state.isAnimation) {
//       LayoutAnimation.easeInEaseOut();
//     }

//检查是否需要回调切换了视图模式
    if (this.state.showModel == 'Month') {
      this.hasChangeShowModel('Week');
    }
//保存数据
    this.setState({
      daysData:newDaysData,
      showModel:this.state.allowSwitch?'Week':this.state.showModel,
      selectGroup:selectDict,
    })

//回调
    this.onSelectDay(dayID);
  }

//***************************************************************
//                          组件数据部分
//***************************************************************

//获得指定月 日历年月head
  getCanlendarHeader(date){
    var year = date.getFullYear();
    var month = date.getMonth();
    var str = this.getMonthText(month)+' '+year;
    return str;
  }

//获得指定中文月份
  getMonthText(num){
    var monthData = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',];
    if (num == -1) {
      num = 11
    }
    if (num == 12) {
      num = 0
    }
    var str = monthData[num];
    return str;
  }

//获得指定月完整日历
  genCompleteDays(date,showModel){
    //设定标记
    var defaultShowStatus = showModel == 'Month'?true:false;
    var curWeekTag = false;
    //当前时间年月 
    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth();
    var curDate = curDate.getDate();
    //指定的年月
    var year = date.getFullYear();
    var month = date.getMonth();
    //当前月第一天
    var firstDayOnMonth = new Date(year, month,1);
    //初始日历相关数组
    var countID = 0;//日历标识id计数器
    var weekCount = 0;//周天数计数器
    var daysArray = [{isShow:defaultShowStatus,status:false,days:[]},];
    
    //补齐本月1号之前的空余天数(上月)********************************************
    var preMonthDayCount = (new Date(year, month,0)).getDate();
    var tempArray = [];
    for (var i = 0; i < firstDayOnMonth.getDay(); i++,countID++,weekCount++) {
      tempArray.push({
        id:countID,
        day:(preMonthDayCount-firstDayOnMonth.getDay()+i+1).toString(),
        status:false,
        defaultTintColor:weekCount==0||weekCount==6?this.state.weekEndTintColor:this.state.workdayTintColor,
        isToday:false,
        isWeekEnd:weekCount==0||weekCount==6?true:false,
        isInMonth:false,
        handler:()=>this.toPreviousMonth()
      });
    }
    daysArray[0].days = tempArray;

    //插入本月日历********************************************
    //获得本月总天数
    var countDay = (new Date(year, month+1,0)).getDate();
    //天计数器
    var dayCount = 1;

    while (dayCount<countDay+1) {

      var weekDaysArray = daysArray[daysArray.length-1].days;
      for (; weekCount < 7; weekCount++,dayCount++,countID++) {
        if (dayCount>countDay) {
          break;
        }
        var isCurDay = false;
        if (curYear==year && curMonth == month && curDate == dayCount) {
          curWeekTag = true;
          isCurDay = true;
        }
        weekDaysArray.push({
          id:countID,
          day:dayCount.toString(),
          status:false,
          defaultTintColor:weekCount==0||weekCount==6?this.state.weekEndTintColor:this.state.workdayTintColor,
          isToday:isCurDay,
          isWeekEnd:weekCount==0||weekCount==6?true:false,
          isInMonth:true,
          handler:this.SelectedDay.bind(this,countID),
        });
      }

      //将新的周(日集合)数组替换进月数组
      daysArray[daysArray.length-1].days = weekDaysArray;
      if (curWeekTag) {
        daysArray[daysArray.length-1].isShow = true;
        curWeekTag = false;
      }
      //周置零
      if (weekCount>=6) {
          weekCount = 0;
      }
      if (dayCount<countDay+1) {
          daysArray.push({isShow:defaultShowStatus,status:false,days:[]});
      }

    }

    //补齐月末空余下天数(下月)********************************************
    if (weekCount < 6) {
      var weekDaysArray = daysArray[daysArray.length-1].days;
      for (var i = 0; weekCount < 7; weekCount++,countID++,i++) {
        weekDaysArray.push({
          id:countID,
          day:(i+1).toString(),
          status:false,
          defaultTintColor:weekCount==0||weekCount==6?this.state.weekEndTintColor:this.state.workdayTintColor,
          isToday:false,
          isWeekEnd:weekCount==0||weekCount==6?true:false,
          isInMonth:false,
          handler:()=>this.toNextMonth()
        });
      }
      daysArray[daysArray.length-1].days = weekDaysArray;
    }
    return daysArray;
  }

//***************************************************************
//                          组件UI部分
//***************************************************************
//获得周期容器--参数:星期数组
  renderWeekDaysContainer(weekdata:array){
    var tempArray = [];
    for (var i=0; i<weekdata.length ;i++) {
      tempArray.push(
        <View key={'weekInfo'+i} style={styles.headWeekItem}>
        <Text allowFontScaling={false} style={styles.headWeekContent}>{weekdata[i]}</Text>
        </View>
      )
    }
    return tempArray;
  }

//获得日历 天 容器--参数:日期,业务数据
  renderCalendarDayContainer(data){

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
      <DayItem />
    )
  }

//获得日历 周 容器--参数:日期数组,业务数据
  renderCalendarWeekContainer(daysGroup,key){
    var tempArray = [];
    for (var i = 0; i < 7; i++) {
      tempArray.push(
        this.renderCalendarDayContainer(daysGroup.days[i])
      )
    }
    return(
      <View key={'week'+key} style={styles.CalendarWeekContainer}>
      {tempArray}
      </View>
    )
  }

//获得日历容器--参数:开始星期,时间unix,业务数据
  renderCalendarContainer(daysData){

    var tempArray = [];
    for (var key in daysData) {
      if (daysData[key].isShow) {
        tempArray.push(
          this.renderCalendarWeekContainer(daysData[key],key)
        )
      }
    }

    return tempArray;
}

//获得日历头部切换容器
  renderCalendarHeadContainer(){

    // 月显示
    if (this.state.showModel == 'Month') {
      return (
        <View style={styles.headContainer}>
           <TouchableOpacity style={styles.hotArea} onPress={()=>this.toPreviousMonth()}><Text style={styles.switcContent}>{this.getMonthText(this.state.showDate.getMonth()-1)}</Text></TouchableOpacity>
           <TouchableOpacity style={{flex:1}} onPress={()=>this.recoveryMonthModel()}><Text allowFontScaling={false} style={styles.calenarTitle}>{this.getMonthText(this.state.showDate.getMonth())}</Text></TouchableOpacity>
           <TouchableOpacity style={styles.hotArea} onPress={()=>this.toNextMonth()}><Text style={styles.switcContent}>{this.getMonthText(this.state.showDate.getMonth()+1)}</Text></TouchableOpacity>
        </View>
      )
    }

    //周显示
    if (this.state.showModel == 'Week') {
      return (
        <View style={styles.headContainer}>
           <TouchableOpacity style={styles.hotArea} onPress={()=>this.toPreviousWeek()}><Text style={styles.switcContent}>上周</Text></TouchableOpacity>
           <TouchableOpacity style={{flex:1}} onPress={()=>this.recoveryMonthModel()}><Text allowFontScaling={false} style={styles.calenarTitle}>{this.getMonthText(this.state.showDate.getMonth())}</Text></TouchableOpacity>
           <TouchableOpacity style={styles.hotArea} onPress={()=>this.toNextWeek()}><Text style={styles.switcContent}>下周</Text></TouchableOpacity>
        </View>
      )
    }
  }

  render(){

    const { style,} = this.props;
    
    return (
      <View style={[styles.container,style]}>
         {this.renderCalendarHeadContainer()}
         <View style={styles.headWeekContainer}>
         {this.renderWeekDaysContainer(this.state.weekData)}
         </View>
         {this.renderCalendarContainer(this.state.daysData)}
      </View>
    )
  }

}

  C2Calendar.defaultProps = {
    showModel:'Month',
    userinterfaceStatus:false,
    isShowWorkTime:true,
    isHiddenOtherWeek:true,
    isAnimation:true,
    allowSwitch:true,
    workdayTintColor:'black',
    weekEndTintColor:'#4285f4',
    nonMonthTintColor:'#aaaaaa',
    daySelectedTintColor:'white',
    workTimeBackgroundColor:'rgba(66, 133, 244, 0.38)',
    currentDayBackgroundColor:'#ff6600',
    selectedDayBackgroundColor:'black',
    timeGroup:{},
    selectGroup:{},
    onSelectedDate:()=>true,
    hasChangeMonth:()=>true,
    hasChangeShowModel:()=>true,
  };

let styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
  },
  headContainer:{
    flexDirection:'row',
  },
  calenarTitle:{
    flex:1,
    marginTop:14,
    marginBottom:14,
    fontSize:18,
    textAlign:'center',
    color:'black',
  },
  hotArea:{
    flexDirection:'row',
  },
  switcContent:{
    alignSelf:'center',
    marginLeft:14,
    marginRight:14,
    fontSize:12,
    marginTop:5,
    marginBottom:5,
  },
  headWeekContainer:{
    flexDirection:'row',
    borderBottomWidth:0.5,
    borderColor:'#d7d7d7',
  },
  headWeekItem:{
    flex:1,
    flexDirection:'row',
  },
  headWeekContent:{
    flex:1,
    alignSelf:'center',
    marginTop:5,
    marginBottom:5,
    textAlign:'center',
    fontSize:11,
    color:'#333333',
  },
  CalendarDayItem:{
    flex:1,
    flexDirection:'column',
    height:61.5,
    backgroundColor:'white',
    borderColor:'#d7d7d7',
    borderBottomWidth:0.5,
  },
  CalendarWeekContainer:{
    flex:1,
    flexDirection:'row',
  },
  recordTimeContainer:{
    flex:1,
    backgroundColor:'red',
    height:150,
  }
});

module.exports = C2Calendar;
