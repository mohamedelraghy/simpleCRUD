const express = require('express');

const postRoute = require('./routes/post');

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('heare');
  res.json('Hello World!');
})


app.use('/post', postRoute);

app.listen(3000, ()=> {
  console.log(`app listening on port`);
})