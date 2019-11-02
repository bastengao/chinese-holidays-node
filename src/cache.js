import fs from 'fs';
import path from 'path';
import request from 'request';
import rq from 'request-promise-native';
import crypto from 'crypto';
import Bundled from './bundled';
import Days from './days';

const DataEndpoint = 'http://bastengao.coding.me/chinese-holidays-data/data';
const IndexUrl = `${DataEndpoint}/index.json`;
const CacheDir = path.resolve(__dirname, '../cache');
const NewCacheDir = path.resolve(__dirname, '../cache_temp');

// TODO: checkUpdateInterval 检查更新周期

// 1. check index file changed
// 2. down load index and data file to new cache dir
// 3. check file syntax
// 4. swithc to new cache dir
const Cache = {
  verbose: false,
  events() {
    return this.loadEventsFromRemote();
  },

  loadEventsFromRemote() {
    const self = this;
    if (!fs.existsSync(CacheDir)) {
      fs.mkdirSync(CacheDir);
    }

    if (!fs.existsSync(NewCacheDir)) {
      fs.mkdirSync(NewCacheDir);
    }

    return new Promise((resolve, reject) => {
      if (self.verbose) {
        console.log(`loading data from ${IndexUrl}`);
      }

      request(IndexUrl, (error, response, body) => {
        if (error) {
          if (self.verbose) {
            console.log(`load failed: ${error}`);
          }
          reject(error);
          return;
        }
        const indexFile = `${CacheDir}/index.json`;
        if (fs.existsSync(indexFile)) {
          if (self.checksumFromFile(indexFile) === self.checksumFromContent(body)) {
            console.log('same hash skip update');
            resolve(Bundled.loadEventsFromDir(CacheDir));
            return;
          }
        }
        fs.writeFileSync(`${NewCacheDir}/index.json`, body);

        const entries = JSON.parse(body);
        entries.sort((a, b) => a.year - b.year);

        const promises = self.downloadEntries(entries);
        Promise.all(promises).then((bodys) => {
          let events = [];
          bodys.forEach((bodyOfYear) => {
            try {
              const valuesOfYear = JSON.parse(bodyOfYear);
              const eventsOfYear = valuesOfYear.map((ele) => new Days(ele.name, ele.range, ele.type));
              events = events.concat(eventsOfYear);
            } catch (err) {
              reject(err);
            }
          });
          self.moveToCurrentCacheDir(entries);
          resolve(events);
        }).catch((err) => {
          reject(err);
        });
      });
    });
  },
  downloadEntries(entries) {
    const self = this;
    return entries.map((entry) => {
      const url = `${DataEndpoint}/${entry.year}.json`;
      if (self.verbose) {
        console.log(`loading data from ${url}`);
      }
      const p = rq({ uri: url });

      p.then((body) => {
        const filename = `${NewCacheDir}/${entry.year}.json`;
        fs.writeFileSync(filename, body);
      });

      return p;
    });
  },
  moveToCurrentCacheDir(entries) {
    let files = ['index.json'];
    files = files.concat(entries.map((e) => `${e.year}.json`));
    files.forEach((file) => {
      fs.copyFileSync(`${NewCacheDir}/${file}`, `${CacheDir}/${file}`);
      fs.unlinkSync(`${NewCacheDir}/${file}`);
    });
  },
  checksumFromFile(file) {
    return this.checksumFromContent(fs.readFileSync(file, 'utf8'));
  },
  checksumFromContent(buff) {
    return crypto.createHash('sha256').update(buff).digest('hex');
  },
};

module.exports = Cache;
