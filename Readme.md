# NODE ACL - Firebase backend
This adds firebase backend support and tests to [NODE ACL](https://github.com/OptimalBits/node_acl)

## NOTE: THIS PROJECT IS NOT MAINTAINED.
I suggest using other acl backends.

## Installation

Using npm:

```javascript
npm install acl-firebase
```

## Usage
Register at [firebase.com](https://www.firebase.com) and create app.
Create Firebase instance at your node.js application. You can use any path desired.
Create acl module by requiring it and instantiating it with Firebase backend instance:

```javascript
// require Firebase and get instance to firebase path
var Firebase = require('firebase');
var fb = new Firebase('https://put-firebase-address-here/');

// enable firebase client data caching by using on() listener (optional)
fb.on('value', function(dataSnapshot) {
  // no need to do anything here
});

// require acl and create Firebase backend
var acl = require('acl');
acl = new acl(new acl.firebaseBackend(fb));
```

## Documentation
See [NODE ACL documentation](https://github.com/OptimalBits/node_acl#documentation)

## License

MIT
