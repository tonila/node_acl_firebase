#NODE ACL - Firebase backend
This fork adds firebase backend support and tests to [NODE ACL](https://github.com/OptimalBits/node_acl)

##Installation

Using npm:

```javascript
npm install acl-firebase
```

##Usage
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

##Documentation
See [NODE ACL documentation](https://github.com/OptimalBits/node_acl#documentation)

##License 

(The MIT License)

Copyright (c) 2014 Toni Lahnalampi <toni.lahnalampi@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
