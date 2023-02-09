//https://stackoverflow.com/questions/5834014/lf-will-be-replaced-by-crlf-in-git-what-is-that-and-is-it-important
//LF TO CRLF!!!!!!

//https://manage.auth0.com/dashboard/us/dev-844ihsmwwpk7lzn5/connections/database/con_NGCCFp4WKnZ5HDZH/plug ?

const express = require('express');
const api = require('./api');
const app = express();

//var cors = require('cors')


app.use('/api', api);
//app.use(cors())

app.listen(5000, () => {
  console.log("Server running on port 5000");
})