const express = require('express');


const postController = require('../controllers/posts');

const router = express.Router();

router.get('/', postController.getAll);

router.post('/create-post', postController.createPost);

router.put('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
