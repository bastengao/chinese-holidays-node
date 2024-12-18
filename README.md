# chinese-holidays

提供具有中国特色的休假安排或者工作日查询。

### Install

    npm install chinese-holidays

### Usage

支持在线更新数据和本地离线数据两种方式。

```javascript
var ChineseHolidays = require('chinese-holidays');

ChineseHolidays.ready().then(function(book, err){
  if err != null {
    return
  }

  元旦 = new Date(2016, 0, 1)
  // 是否休假(含正常的周六、周日)
  book.isHoliday(元旦)
  // true

  // 是否是工作日(含节假日的调休)
  book.isWorkingday(元旦)
  // fase


  // 列出已知的节假日
  book.all().forEach(function(holiday){
    console.log(holiday.name)
    console.log(holiday.days().map(function(date) { return moment(date).format('YYYY-MM-DD') }))
  })
  // 元旦
  // ["2016-01-01", "2016-01-02", "2016-01-03"]
  // ...

  // 列出所有的特殊日子(节假日和调休)
  book.events().forEach(function(event){
    console.log(event.name, event.days(), event.isHoliday(), event.isWorkingday())
  })
})


// disable update from remote, default is false.
const options = {
  offline: true
};
ChineseHolidays.ready(options)
```

### Documentation

[API documentation](https://bastengao.com/chinese-holidays-node/)

### Support

支持在线更新[节假日数据](https://github.com/bastengao/chinese-holidays-data)，如果无法联网则使用本地打包的数据。

* [支持 2025 年](https://www.gov.cn/zhengce/content/202411/content_6986382.htm)
* [支持 2024 年](https://www.gov.cn/zhengce/content/202310/content_6911527.htm)
* [支持 2023 年](http://www.gov.cn/zhengce/content/2022-12/08/content_5730844.htm)
* [支持 2022 年](http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm)
* [支持 2021 年](http://www.gov.cn/zhengce/content/2020-11/25/content_5564127.htm)
* [支持 2020 年](http://www.gov.cn/zhengce/content/2019-11/21/content_5454164.htm)
* [支持 2019 年](http://www.gov.cn/zhengce/content/2018-12/06/content_5346276.htm) [五一假期调整](http://www.gov.cn/zhengce/content/2019-03/22/content_5375877.htm)
* [支持 2018 年](http://www.gov.cn/zhengce/content/2017-11/30/content_5243579.htm)
* [支持 2017 年](http://www.gov.cn/zhengce/content/2016-12/01/content_5141603.htm)
* 支持 2016 年

### References

* http://www.gov.cn/zhengce/content/2015-12/10/content_10394.htm

### License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
