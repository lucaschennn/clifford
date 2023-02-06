//https://stackoverflow.com/questions/5834014/lf-will-be-replaced-by-crlf-in-git-what-is-that-and-is-it-important
//LF TO CRLF!!!!!!
const express = require('express');
const app = express();
const api = require('./api');

app.use('/api', api);

app.listen(5000, () => {
  console.log("Server running on port 5000");
})