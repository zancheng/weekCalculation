// 获取某年某月的有多少周
String.prototype.weekInMonthCount = function () {
    var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1));
    var firstWeekDate = 1;// 默认第一周是本月1号  为了模拟本月1号是否为本月第1周的判断
    if (date.getDay() === 1) { // 判断1号是周一
        firstWeekDatek = 1;
    } else if (date.getDay() === 0) { // 判断1号是周日
        firstWeekDate = 8 - 7 + 1;
    } else { // 判断1号是周二至周六之间
        firstWeekDate = 8 - date.getDay() + 1;
    }
    date.setMonth(date.getMonth()+1);
    date.setDate(0);
    var monthHasDays = date.getDate();// 本月天数
    monthHasDays = date.getDate() - firstWeekDate + 1;
    var hasWeek = Math.ceil(monthHasDays/7); // 计算本月有几周
    return hasWeek;
};
// 获取今天是今年的第几周
String.prototype.weekIndexInYear = function () {
    var nowDate = new Date(this != '' ? this : new Date());
    var initTime = new Date(this != '' ? this : new Date());
    initTime.setMonth(0); // 本年初始月份
    initTime.setDate(1); // 本年初始时间
    initTime.setHours(0);
    initTime.setMinutes(0);
    initTime.setSeconds(0);

    nowDate.setHours(23);
    nowDate.setMinutes(59);
    nowDate.setSeconds(59);
    var differenceVal = nowDate - initTime ; // 今天的时间减去本年开始时间，获得相差的时间
    var todayYear = Math.ceil(differenceVal/(24*60*60*1000)); // 获取今天是今年第几天
    var firstDay = initTime.getDay(); // 获取这年的第一天是周几，因为首周可能是上一年的最后一周内
    var startDiff;
    if (firstDay === 0) {
        startDiff = 1;
    } else if (firstDay === 1) { // 第一天是周一
        startDiff = 0;
    } else {
        startDiff = 7 - firstDay + 1;
    }
    return Math.ceil((todayYear - startDiff)/7); // 返回今天是今年第几周
};
// 获取今天是今年的第几天
String.prototype.dateIndexInYear = function () {
    var nowDate = new Date(this != '' ? this : new Date());
    var initTime = new Date(this != '' ? this : new Date());
    initTime.setMonth(0); // 本年初始月份
    initTime.setDate(1); // 本年初始时间
    var differenceVal = nowDate - initTime ; // 今天的时间减去本年开始时间，获得相差的时间
    return Math.ceil(differenceVal/(24*60*60*1000));
};
// 获取今天是第几周
String.prototype.weekIndexInMonth = function () {
    var date = new Date(this.trim() != '' ? this : new Date());
    var dateStart = new Date((new Date(this.trim() != '' ? this : new Date()).setDate(1))); // 本月初
    var firstWeek = 1;
    if (dateStart.getDay() === 1) {
        firstWeek = 1;
    } else if (dateStart.getDay() === 0) {
        firstWeek = 8 - 7 + 1;
    } else {
        firstWeek = 8 - dateStart.getDay() + 1;
    }
    var weekIndex = 1;
    var c = date.getDate();
    if (date.getDay() === 1 && date.getDate() < 7) {
        weekIndex = 1;
    } else if (c < firstWeek ) {
        weekIndex = -1;
    } else {
        if (c < 7) {
            weekIndex = Math.ceil(c/7);
        } else {
            c =  c - firstWeek + 1;
            if (c%7 === 0) {
                if (dateStart.getDay() !== 6) {
                    weekIndex = c/7;
                } else {
                    weekIndex = c/7 + 1;
                }
            } else {
                weekIndex = Math.ceil(c/7);
            }
        }
    }
    return weekIndex;
};
// 获取周的区间
String.prototype.getWeekRange = function () {
    var nowDate = new Date(this.trim() != '' ? this : new Date()),
        week = nowDate.getDay(),
        weekStart,
        weekEnd,
        minDiff,
        maxDiff;
    if (week !== 0) {
        minDiff = 1 - week;
    } else {
        minDiff = -6;
    }
    if (minDiff >= 0) {
        weekStart = new Date(nowDate.setDate(nowDate.getDate() + minDiff));
    } else {
        weekStart = new Date(nowDate.setDate(nowDate.getDate() + minDiff));
    }
    nowDate = new Date(this.trim() != '' ? this : new Date()); // 重新赋值，为了取区间结束
    if (week !== 0) {
        maxDiff = 7 - week;
    } else {
        maxDiff = 0;
    }
    weekEnd = new Date(nowDate.setDate(nowDate.getDate() + maxDiff));
    return [dateFormat(weekStart, 'yyyy/MM/dd'), dateFormat(weekEnd, 'yyyy/MM/dd')];
}
// 时间格式化
function dateFormat (date, format) {
    if ((date+'').match('-')) {
        date=date.replace(new RegExp(/-/gm) ,"/");
    }
    date = new Date(date);
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };


    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}
