const { PrismaClient } = require('@prisma/client');

const { validate, checkPost } = require('./helper');

const prisma = new PrismaClient();

async function updatePost(req, res, next) {
  
  validate(req, next);
  
  const { id } = req.params
  const { title, content, type } = req.body;
  
  try {

    checkPost(id);

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: title,
        content: content,
        type: type
      },
    });

    res.status(200).json({
      message: "Post Updated",
      post: updatedPost
    });

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

module.exports = updatePost;