var Acl = require('../')
  , tests = require('../node_modules/acl/test/tests');


describe('Firebase', function () {
    this.timeout(7000);
  before(function (done) {
    var self = this;

    var Firebase = require('firebase');
    var fb = new Firebase('https://put-firebase-address-here/');
    self.backend = new Acl.firebaseBackend(fb);
    var called = false;
    fb.on('value', function(dataSnapshot) {
        // enable firebase client caching by using on() listener
        if (!called) {
            done();
            called = true;
        }
    });
  });

  run();
});

function run() {
  Object.keys(tests).forEach(function (test) {
    tests[test]()
  })
}