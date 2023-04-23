const express = require('express');

const postRoute = require('./routes/post');

const app = express();


app.get('/', (req, res, next) => {
  res.send('Hello World!');
})


app.use('/post', postRoute);

app.listen(3000, ()=> {
  console.log(`app listening on port`);
})