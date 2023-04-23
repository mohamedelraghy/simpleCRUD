const express = require('express');

const postRoute = require('./routes/post');

const app = express();

app.use(express.json());

app.use('/post', postRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(3000, ()=> {
  console.log(`app listening on port`);
})