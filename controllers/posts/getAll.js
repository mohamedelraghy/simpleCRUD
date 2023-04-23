const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAll(req, res, next) {

  const users = await prisma.post.findMany();
  res.json(users)

}

module.exports = getAll;