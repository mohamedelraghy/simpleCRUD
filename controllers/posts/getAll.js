const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAll(req, res, next) {

  const {currentPage = 1, type, title, content} = req.query;
  const perPage = Number(req.query.perPage) || 2;

  try {
    const posts = await prisma.post.findMany({
      where: {
        type: type? { contains: type }: undefined,
        title: title? { contains: title }: undefined,
        content: content? { contains: content }: undefined
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (currentPage - 1) * perPage,
      take: perPage
    });

    if (posts.length <= 0) {
      const error = new Error("No Post is Found!");
      error.statusCode = 404;
      throw error; 
    }

    const totalPost = await prisma.post.count({
      where: {
        type: type? { contains: type }: undefined,
        title: title? { contains: title }: undefined,
        content: content? { contains: content }: undefined
      },
    });

    res.status(200).json({
      message: "Posts fetched successfully",
      posts: posts,
      totalPost,
      totalPages: Math.ceil(totalPost / perPage),
      currentPage
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

}

module.exports = getAll;