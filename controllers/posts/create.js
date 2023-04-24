const { PrismaClient } = require('@prisma/client');

const { validate } = require('./helper');

const prisma = new PrismaClient();

async function createPost (req, res, next) {
  
  validate(req, next);

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