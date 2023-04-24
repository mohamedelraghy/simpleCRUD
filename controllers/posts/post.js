const { PrismaClient } = require('@prisma/client');

const { checkPost } = require('./helper');

const prisma = new PrismaClient();

async function getPost(req, res, next) {
  
  const { id } = req.params;

  try {    

    await checkPost(id);
    
    res.status(200).json({
      message: "Post Fetched",
      post: post
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

};

module.exports = getPost;