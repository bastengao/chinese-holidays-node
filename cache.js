var fs = require('fs');
var path = require('path');
var request = require('request');
var rq = require('request-promise-native');
var Days = require('./days');

var DataEndpoint = 'http://bastengao.coding.me/chinese-holidays-data/data';
var IndexUrl = DataEndpoint + '/index.json';

// TODO: check is up to date
var Cache = {
  verbose: false,
  events: function () {
    return this.loadEventsFromRemote()
  },

  loadEventsFromRemote: function () {
    var self = this
    var cacheDir = path.resolve(__dirname, './cache')
    if (!fs.statSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }
    
    // TODO: load offline data when fetch failed
    return new Promise(function (resolve, reject) {
      if(self.verbose) {
        console.log('loading data from ' + IndexUrl)
      }

      request(IndexUrl, function (error, response, body) {
        if (error) {
          if(self.verbose) {
            console.log('load failed: ' + error)
          }
          reject(error)
          return
        }
        fs.writeFileSync(cacheDir + '/index.json', body);

        var entries = JSON.parse(body)
        entries.sort(function (a, b) {
          return a['year'] - b['year']
        })

        var promises = entries.map(function (entry) {
          var url = DataEndpoint + '/' + entry['year'] + '.json'
          if(self.verbose) {
            console.log('loading data from ' + url)
          }
          var p = rq({ uri: url, json: true })

          p.then(function(values){
            var path = cacheDir + '/' + entry['year'] + '.json'
            fs.writeFileSync(path, JSON.stringify(values))
          });

          return p;
        })

        Promise.all(promises).then(function (values) {
          var events = []
          values.forEach(function(valuesOfYear) {
            var eventsOfYear = valuesOfYear.map(function (ele) {
              return new Days(ele.name, ele.range, ele.type);
            })
            events = events.concat(eventsOfYear)
          })
          resolve(events)
        }).catch(function(err) {
          reject(err)
        })
      })
    })
  }
}

module.exports = Cache