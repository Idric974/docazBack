const router = require('express').Router();
const postController = require('../controllers/postsController');
const multer = require('multer');
const upload = multer();
// const multer = require('../middleware/multer-config');

//! GET.

router.get('/readAllPosts', postController.readAllPosts);

//! -------------------------------------------------

//! POST

router.post('/createPost', upload.single('file'), postController.createPost);

//! -------------------------------------------------

module.exports = router;
