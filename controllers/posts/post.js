const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getPost(req, res, next) {
  
  const { id } = req.params;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
    });
    
    if (!post) {
      const error = new Error(`Post with ID ${id} does not exist in the database`);
      error.statusCode = 404;
      throw error; 
    }


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