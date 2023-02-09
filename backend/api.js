const mysql = require('mysql')
var express = require('express');
var cors = require('cors')

const { auth } = require('express-oauth2-jwt-bearer')


var router = express.Router();

const connection = mysql.createConnection({
    host: 'bszh9mifzcwp8sawzczk-mysql.services.clever-cloud.com',
    user: 'uyhz9vk8br9lymwa',
    password: 'FPPIyHB6XavOx7nOKokl',
    database: 'bszh9mifzcwp8sawzczk'
})

connection.connect()
  
const corsOptions = {
    origin: "http://127.0.0.1:5173",
    optionsSuccessStatus: 200
}
const checkJwt = auth({
    audience: 'http://localhost:5000',
    issuerBaseURL: corsOptions.origin,
});
  

router.get('/', cors(), (req, res) => {
    console.log("/")
    res.json({"data": "nothing right now"})
});

router.get('/test', cors(corsOptions), (req, res) => {
    console.log("call to /api/test was successful")
    res.json({
        "message": 'The associated request was a whitelisted origin'
    })
});

router.get('/insert/user', cors(corsOptions), (req, res) => {
    //params: {email: email, username: username, prefs,{}}
    //db.insert(users, params) table, to insert (in json)
    console.log("success")
})

connection.end()

module.exports = router;