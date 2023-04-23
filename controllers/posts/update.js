const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updatePost(req, res, next) {
  const { id } = req.params
  const { title, content } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: title,
        content: content
      },
    })

    res.json(post)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
}

module.exports = updatePost;