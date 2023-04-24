const { PrismaClient } = require('@prisma/client');

const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

exports.validate = (req, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    return next(error);
  }
};

exports.checkPost = async (id, next) => {
  
  const post = await prisma.post.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!post) {
    const error = new Error(`Post with ID ${id} does not exist in the database`);
    error.statusCode = 404;
    return next(error); 
  }
};