var fs = require('fs');
var path = require('path');
var request = require('request');
var rq = require('request-promise-native');
var crypto = require('crypto')
var Bundled = require('./bundled')
var Days = require('./days');

var DataEndpoint = 'http://bastengao.coding.me/chinese-holidays-data/data';
var IndexUrl = DataEndpoint + '/index.json';
var CacheDir = path.resolve(__dirname, './cache')
var NewCacheDir = path.resolve(__dirname, './cache_temp')

// 1. check index file changed
// 2. down load index and data file to new cache dir
// 3. check file syntax
// 4. swithc to new cache dir
var Cache = {
  verbose: false,
  events: function () {
    return this.loadEventsFromRemote()
  },

  loadEventsFromRemote: function () {
    var self = this
    if (!fs.existsSync(CacheDir)) {
      fs.mkdirSync(CacheDir);
    }

    if (!fs.existsSync(NewCacheDir)) {
      fs.mkdirSync(NewCacheDir);
    }
    
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
        var indexFile = CacheDir + '/index.json'
        if(fs.existsSync(indexFile)) {
          if(self.checksumFromFile(indexFile) == self.checksumFromContent(body)) {
            console.log("same hash skip update")
            resolve(Bundled.loadEventsFromDir(CacheDir))
            return;
          }
        }
        fs.writeFileSync(NewCacheDir + '/index.json', body);

        var entries = JSON.parse(body)
        entries.sort(function (a, b) {
          return a['year'] - b['year']
        })

        var promises = self.downloadEntries(entries)
        Promise.all(promises).then(function (bodys) {
          var events = []
          bodys.forEach(function(bodyOfYear) {
            try {
              var valuesOfYear = JSON.parse(bodyOfYear)
              var eventsOfYear = valuesOfYear.map(function (ele) {
                return new Days(ele.name, ele.range, ele.type);
              })
              events = events.concat(eventsOfYear)
            } catch(err) {
              reject(err)
            }
          })
          self.moveToCurrentCacheDir(entries)
          resolve(events)
        }).catch(function(err) {
          reject(err)
        })
      })
    })
  },
  downloadEntries: function(entries) {
    return entries.map(function (entry) {
      var url = DataEndpoint + '/' + entry['year'] + '.json'
      if(this.verbose) {
        console.log('loading data from ' + url)
      }
      var p = rq({ uri: url})

      p.then(function(body){
        var path = NewCacheDir + '/' + entry['year'] + '.json'
        fs.writeFileSync(path, body)
      });

      return p;
    })
  },
  moveToCurrentCacheDir: function(entries) {
    var files = ["index.json"]
    files = files.concat(entries.map(function(e) { return e["year"] + ".json" }))
    files.forEach(function(file) {
      fs.copyFileSync(NewCacheDir + "/" + file, CacheDir + "/" + file)
      fs.unlinkSync(NewCacheDir + "/" + file)
    })
  },
  checksumFromFile: function(file) {
    return this.checksumFromContent(fs.readFileSync(file, 'utf8'));
  },
  checksumFromContent: function(buff) {
    return crypto.createHash('sha256').update(buff).digest('hex');
  }
}

module.exports = Cache