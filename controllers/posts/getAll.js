const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAll(req, res, next) {

  try {

    const posts = await prisma.post.findMany();

    if (!posts) {
      const error = new Error("No Post is Found!");
      error.statusCode = 404;
      throw error; 
    }

    res.status(200).json({
      message: "Posts fetched successfully",
      posts: posts
    })

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

}

module.exports = getAll;