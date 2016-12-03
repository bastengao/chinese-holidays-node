# chinese-holidays

提供具有中国特色的休假安排或者工作日查询。

### Install

    npm install chinese-holidays


### Usage


```javascript
var ChineseHolidays = require('chinese-holidays');

元旦 = new Date(2016, 0, 1)
// 是否休假(含正常的周六、周日)
ChineseHolidays.isHoliday(元旦)     
// true

// 是否是工作日(含节假日的调休)
ChineseHolidays.isWorkingday(元旦)
// fase


// 列出已知的特殊节假日
ChineseHolidays.all().forEach(function(holiday){
  console.log(holiday.name)
  console.log(holiday.days().map(function(date) { return moment(date).format('YYYY-MM-DD') }))
})
// 元旦
// ["2016-01-01", "2016-01-02", "2016-01-03"]
// ...
```

### Support

* [支持 2017 年](http://www.gov.cn/zhengce/content/2016-12/01/content_5141603.htm)
* 支持 2016 年

### References

* http://www.gov.cn/zhengce/content/2015-12/10/content_10394.htm

### License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
