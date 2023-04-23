const { PrismaClient } = require('@prisma/client');

const prisma = PrismaClient();

async function deletePost(req, res, next) {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
}

module.exports = deletePost;

