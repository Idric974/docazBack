const express = require('express');

const bodyParser = require('body-parser');

const postRoutes = require('./routes/postsRoutes');

const path = require('path');

const app = express();

//! Config headers.

app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
  );
  next();
});

//! Gestion des bodyParser.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//! --------------------------------------------------

app.use(express.json());

//! Liste des routes.

app.use('images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes);

//! --------------------------------------------------

module.exports = app;
