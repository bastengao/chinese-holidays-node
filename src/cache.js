const fs = require('fs');
const path = require('path');
const request = require('request');
const rq = require('request-promise-native');
const crypto = require('crypto');
const Bundled = require('./bundled');
const Days = require('./days');

const DataEndpoint = 'http://bastengao.coding.me/chinese-holidays-data/data';
const IndexUrl = DataEndpoint + '/index.json';
const CacheDir = path.resolve(__dirname, '../cache')
const NewCacheDir = path.resolve(__dirname, '../cache_temp')

// TODO: checkUpdateInterval 检查更新周期

// 1. check index file changed
// 2. down load index and data file to new cache dir
// 3. check file syntax
// 4. swithc to new cache dir
const Cache = {
  verbose: false,
  events: function () {
    return this.loadEventsFromRemote()
  },

  loadEventsFromRemote: function () {
    const self = this
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
        let indexFile = CacheDir + '/index.json'
        if(fs.existsSync(indexFile)) {
          if(self.checksumFromFile(indexFile) == self.checksumFromContent(body)) {
            console.log("same hash skip update")
            resolve(Bundled.loadEventsFromDir(CacheDir))
            return;
          }
        }
        fs.writeFileSync(NewCacheDir + '/index.json', body);

        let entries = JSON.parse(body)
        entries.sort(function (a, b) {
          return a['year'] - b['year']
        })

        const promises = self.downloadEntries(entries)
        Promise.all(promises).then(function (bodys) {
          let events = []
          bodys.forEach(function(bodyOfYear) {
            try {
              const valuesOfYear = JSON.parse(bodyOfYear)
              const eventsOfYear = valuesOfYear.map(function (ele) {
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
    const self = this;
    return entries.map(function (entry) {
      const url = DataEndpoint + '/' + entry['year'] + '.json'
      if(self.verbose) {
        console.log('loading data from ' + url)
      }
      let p = rq({ uri: url})

      p.then(function(body){
        const path = NewCacheDir + '/' + entry['year'] + '.json'
        fs.writeFileSync(path, body)
      });

      return p;
    })
  },
  moveToCurrentCacheDir: function(entries) {
    let files = ["index.json"]
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

module.exports = Cache;
