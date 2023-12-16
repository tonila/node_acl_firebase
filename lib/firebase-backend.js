/**
    Firebase backend Interface for npm acl.
    
    API for providing a backend for the acl npm module.
*/

'use strict';

var contract = require('./contract');
var async = require('async');
var _ = require('lodash');

function FirebaseBackend(fb){
    this.fb = fb;
}

FirebaseBackend.prototype =  {
    /**  
       Begins a transaction.
    */
    begin: function () {
        // returns a transaction object
        return [];
    },

    /**
       Ends a transaction (and executes it)
    */
    end: function (transaction, cb) {
        contract(arguments).params('array', 'function').end();
        // Execute transaction
        async.series(transaction, function(err, resArr) {
            cb(err);
        });
    },

    /**
      Cleans the whole storage.
    */
    clean: function (cb) {
        contract(arguments).params('function').end();
        // there is no need to implement this one.
        throw new Error('not implemented!!!');
    },

    /**
       Gets the contents at the bucket's key.
    */
    get: function (bucket, key, cb) {
        contract(arguments)
          .params('string', 'string|number', 'function')
          .end();

        var self = this;
        self.fb.child(bucket).child(key).once('value', function(snap) {
          var doc = snap.val();
          if(!_.isObject(doc) ) return cb(undefined, []);
          cb(undefined, _.without(_.keys(doc),"key","_id"));
        }, function(err) {
            cb(err);
        });
    },

    /**
       Returns the union of the values in the given keys.
    */
    union: function (bucket, keys, cb) {
        contract(arguments)
          .params('string', 'array', 'function')
          .end();

        var self = this;
        var fns = [];
        for(var i=0,len=keys.length;i<len;i++){
            (function(key) {
                fns.push(function(cb) {
                    self.fb.child(bucket).child(key).once('value', function(snap) {
                        cb(undefined, snap.val() || []);
                    }, function(err) {
                        cb(err);
                    });
                });
            })(keys[i]);
        }
        async.parallel(fns, function(err, resArr) {        
          var keyArrays = [];
          resArr.forEach(function(doc){
            keyArrays.push.apply(keyArrays, _.keys(doc));
          });
          cb(undefined, _.without(_.union(keyArrays),"key","_id"));
        });
    },

    /**
       Adds values to a given key inside a bucket.
    */
    add: function (transaction, bucket, key, values) {
        contract(arguments)
          .params('array', 'string', 'string|number', 'string|array|number')
        .end();
        if(key=="key") throw new Error("Key name 'key' is not allowed.");

        var self = this;
        transaction.push(function(cb) {
          values = makeArray(values);
          // build doc from array values
          var doc = {};
          values.forEach(function(value){doc[value]=true;});
          
          self.fb.child(bucket).child(key).once('value', function(snap) {
              self.fb.child(bucket).child(key).update(doc, function(err) {
                  cb(err);
              });
          });
        });
    },

    /**
       Delete the given key(s) at the bucket
    */
    del: function (transaction, bucket, keys) {
        contract(arguments)
          .params('array', 'string', 'string|array')
          .end();

        var self = this;
        keys = makeArray(keys);
        transaction.push(function(cb) {
            var fns = [];
            for(var i=0,len=keys.length;i<len;i++){
                (function(key) {
                    fns.push(function(cb) {
                        self.fb.child(bucket).child(key).remove(function(err) {
                            cb(err);
                        });
                    });
                })(keys[i]);
            }
            async.parallel(fns, function(err, resArr) {
                cb(err);
            });
        });        
    },

    /**
        Removes values from a given key inside a bucket.
    */
    remove: function (transaction, bucket, key, values) {
        contract(arguments)
          .params('array', 'string', 'string|number', 'string|array')
        .end();

        var self = this;
        values = makeArray(values);
        transaction.push(function(cb) {
            self.fb.child(bucket).child(key).once('value', function(snap) {
                if (!snap.val()) { return cb(); }                
                // build doc from array values
                var doc = {};
                values.forEach(function(value){doc[value]=true;});                
                
                doc = removeValues(snap.val(), doc);
                self.fb.child(bucket).child(key).set(doc, function(err) {
                    cb(err);
                });
            });
        });
    },
}

function makeArray(arr){
    return Array.isArray(arr) ? arr : [arr];
}

function removeValues(o1, o2) {  
    for (var key2 in o2) {
        if (o1[key2]) {
            delete o1[key2];
        }
    }
    return o1;
}

exports = module.exports = FirebaseBackend;