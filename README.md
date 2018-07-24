# weekCalculation
The calculation of the week

``` bash
* 判断规则：
第一周--是这个月的新一周，且不在上个月最后一周内。*
```
## String.prototype.dateIndexInYear

获取这一天属于今年的第多少天

``` bash
默认时间是今天，调用方法示例：
'2018/10/1'.dateIndexInYear()
返回： 273
```
## String.prototype.weekIndexInYear

获取这一天属于今年的第多少周

``` bash
默认时间是今天，调用方法示例：
'2018-10-1'.weekIndexInYear() 
返回： 39
```

## String.prototype.weekInMonthCount

获取这一年的这一月的有多少周

``` bash
默认时间是今天，调用方法示例：
'2018-10-1'.weekInMonthCount() 
返回： 5
```


## String.prototype.weekIndexInMonth

获取这一周属于本月第多少周

``` bash
如果输入上个月返回 -1
默认时间是今天，调用方法示例：
'2018-10-01'.weekIndexInMonth() 
返回： 1
```
