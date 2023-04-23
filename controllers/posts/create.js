const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

async function createPost (req, res, next) {
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    return next(error)
  }

  const { title, content, type } = req.body
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        type
      }
    });

    res.status(201).json({
      message: "Post Created",
      post: post
    });

  } catch(error) {
    if(!error.statusCode) {
      error.statusCode = 500
      next(error)
    }
  }
  
}

module.exports = createPost;