var auth         = require('./auth')
  , facade       = require('segmentio-facade')
  , helpers      = require('./helpers')
  , integrations = require('..')
  , should       = require('should');


var lytics   = new integrations['Lytics']()
  , settings = auth['Lytics'];


describe('Lytics', function () {

  describe('.enabled()', function () {

    it('should only be enabled for server side messages', function () {
      lytics.enabled(new facade.Track({ channel : 'server' })).should.be.ok;
      lytics.enabled(new facade.Track({ channel : 'client' })).should.not.be.ok;
      lytics.enabled(new facade.Track({})).should.not.be.ok;
    });
  });


  describe('.validate()', function () {

    it('should require a cid', function () {
      lytics.validate({}, { apiKey : 'x', cid : '' }).should.be.an.instanceOf(Error);
      lytics.validate({}, { apiKey : 'x' }).should.be.an.instanceOf(Error);
      should.not.exist(lytics.validate({}, { apiKey : 'x', cid : 'x' }));
    });

    it('should require an apiKey', function () {
      lytics.validate({}, { cid : 'x', apiKey : '' }).should.be.an.instanceOf(Error);
      lytics.validate({}, { cid : 'x' }).should.be.an.instanceOf(Error);
      should.not.exist(lytics.validate({}, { apiKey : 'x', cid : 'x' }));
    });
  });


  describe('.track()', function () {

    it('should track successfully', function (done) {
      var track = helpers.track();
      lytics.track(track, settings, done);
    });
  });

  describe('.identify()', function () {

    it('should identify successfully', function (done) {
      var identify = helpers.identify();
      lytics.identify(identify, settings, done);
    });
  });


  describe('.alias()', function () {

    it('should alias successfully', function (done) {
      var alias = helpers.alias();
      lytics.alias(alias, settings, done);
    });
  });
});