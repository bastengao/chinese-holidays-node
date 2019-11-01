const Cache = require('../lib/cache');
const Days = require('../lib/days');

describe('Cache', () => {
  it('loadEvents', () => {
    return Cache.loadEventsFromRemote().should.be.fulfilled()
  })

  it('loadEventsFromRemote', (done) => {
    Cache.loadEventsFromRemote().then((events) => {
      events.should.not.be.null()
      events[0].should.instanceOf(Days)
      done()
    }).catch((err) => console.log(err))
  })

  // TODO: more test
});
