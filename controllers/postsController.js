const myAdmin = require('../utils/firebase');
const db = myAdmin.firestore();
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');
const { log } = require('console');

//! Créer un post.

module.exports.createPost = async (req, res) => {
  //? Création de l'image dans Cloud Storage.

  console.log('req.file ==========> : ', req.file);
  console.log('req.body ==========> : ', req.body);

  //? --------------------------------------------------

  //? Création des données dans Cloud Firestore.

  let createData = () => {
    return new Promise((resolve, reject) => {
      if (req.body.articleName) {
        const postJson = {
          uid: req.body.uid,
          userName: req.body.userName,
          phone: req.body.phone,
          photoURL: req.body.photoURL,
          articleName: req.body.articleName,
          town: req.body.town,
          price: req.body.price,
          brand: req.body.brand,
          model: req.body.model,
          description: req.body.description,
          postDate: req.body.postDate,
        };

        //  console.log('postJson :', postJson);

        const response = db
          .collection('posts')
          .add(postJson)
          .then(() => {
            console.log('Data enregistées :', response);
            resolve();
          });
      } else {
        console.log('ERROR Test myPromise Pas OK');
        reject();
      }
    });
  };

  //? --------------------------------------------------

  let browserResponse = () => {
    return new Promise((resolve, reject) => {
      if (req.body.articleName) {
        console.log('Test myPromise OK');

        resolve(res.send({ message: ' 👍 Le post a été créé' }));
      } else {
        reject(res.send({ message: " ❌ Le post n'a pas été créé" }));
      }
    });
  };

  //? Resolve promise.

  let handleMyPromise = async () => {
    try {
      await createData();

      await browserResponse();
    } catch (err) {
      console.log('err :', err);
      res.send({ message: " ❌ Le post n'a pas été créé" });
    }
  };

  handleMyPromise();

  //? --------------------------------------------------
};

//! --------------------------------------------------

//! Afficher tous les posts dans Firebase.

module.exports.readAllPosts = async (req, res) => {
  try {
    // const userRef = db.collection('posts');

    const userRef = db.collection('posts').orderBy('postDate', 'desc');

    const response = await userRef.get();

    let responseArr = [];

    response.forEach((doc) => {
      responseArr.push(doc.data());
    });

    res.send(responseArr);

    // console.log('Liste des posts ===> ', responseArr);
  } catch (error) {
    console.error('Error on readAllPosts ====> ', error);
    res.send(error);
  }
};

//! --------------------------------------------------
