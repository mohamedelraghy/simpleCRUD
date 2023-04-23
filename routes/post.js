const express = require('express');

const postController = require('../controllers/posts');

const router = express.Router();


router.post('create-post', postController.createPost);


module.exports = router;
