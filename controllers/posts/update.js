const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updatePost(req, res, next) {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed Entered data is incorrect');
    error.statusCode = 442;
    next(error);
  }
  
  const { id } = req.params
  const { title, content } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: title,
        content: content
      },
    });

    if (!post) {
      const error = new Error("Post with ID ${id} does not exist in the database");
      error.statusCode = 404;
      throw error; 
    }

    res.statusCode(200).json({
      message: "Post Updated",
      post: post
    });

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

module.exports = updatePost;