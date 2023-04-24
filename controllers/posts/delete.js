const { PrismaClient } = require('@prisma/client');

const { checkPost } = require('./helper');

const prisma = new PrismaClient();

async function deletePost(req, res, next) {
  const { id } = req.params;

  try {

    await checkPost(id);

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(204).json({
      message: "Post deleted",
      post: deletedPost
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

module.exports = deletePost;

