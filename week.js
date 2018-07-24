// 获取某年某月的有多少周
String.prototype.weekInMonthCount = function () {// 传参是实际时间，如：今天是2018-5，传 2018, 5
    var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1));// m等于实际月份，m-1等于日历月份,最后的1是为了模拟本月初始时间1号来计算1号是不是第一周
    <!--为了模拟本月1号是否为本月第1周的判断-->
    var firstWeekDate = 1;// 默认第一周是本月1号
    if (date.getDay() === 1) { // 判断1号是周一
        firstWeekDatek = 1;
    } else if (date.getDay() === 0) { // 判断1号是周日
        firstWeekDate = 8 - 7 + 1;
    } else { // 判断1号是周二至周六之间
        firstWeekDate = 8 - date.getDay() + 1;
    }
    console.info('今天是'+date.getFullYear()+'年'+(date.getMonth()+1)+'月：');
    console.info('本月第一周是-----:'+firstWeekDate+'日');
    date.setMonth(date.getMonth()+1);
    date.setDate(0);
    var monthHasDays = date.getDate();// 本月天数
    console.info('本月有-----:'+date.getDate()+'天');
    monthHasDays = date.getDate() - firstWeekDate + 1;
    var hasWeek = Math.ceil(monthHasDays/7); // 计算本月有几周
    console.info('本月有-----:'+hasWeek+'周');
    return hasWeek;
};
// 获取今天是今年的第几周
String.prototype.weekIndexInYear = function () {
    var nowDate = new Date();
    var initTime = new Date();
    initTime.setMonth(0); // 本年初始月份
    initTime.setDate(1); // 本年初始时间
    var differenceVal = nowDate - initTime ; // 今天的时间减去本年开始时间，获得相差的时间
    var todayYear = Math.ceil(differenceVal/(24*60*60*1000)); // 获取今天是今年第几天
    var index = Math.ceil(todayYear/7); // 获取今天是今年第几周
    console.info("今天是本年第"+todayYear+"天，第"+index+"周");//周日做为下周的开始计算
    return index;
};
// 获取今天是第几周
String.prototype.weekIndexInMonth = function () { // 传参是实际时间，如：今天是2018-5-7，传 2018, 5, 7
    var date = new Date(this.trim() != '' ? this : new Date()); // m等于实际月份，m-1等于日历月份
    var dateStart = new Date((new Date(this.trim() != '' ? this : new Date()).setDate(1))); // 本月初
    console.info(date);
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