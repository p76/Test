'use strict'

//获得指定年份-周-起始时间(默认周日)的开始日期
export function startDateWithTheWeek(year,week,weekDay){

  var curDate = new Date();

  curDate.setFullYear(year);
  curDate.setMonth(0);
  curDate.setDate(1);
  curDate.setHours(0);
  curDate.setMinutes(0);
  curDate.setSeconds(1);
  var weekDay = curDate.getDay();
  var unixDate = curDate.getTime();
  unixDate = unixDate - 86400000 * (weekDay-1);
  unixDate = unixDate+604800000*week;
  curDate.setTime(unixDate);
  return curDate;
}
