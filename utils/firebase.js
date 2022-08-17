const admin = require('firebase-admin');
const credentials = require('./key.json');

const myAdmin = admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = myAdmin;
