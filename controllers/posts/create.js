const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPost (req, res, next) {
  const { title, content } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content
    }
  })
  res.status(200).json(result)
}

module.exports = createPost;