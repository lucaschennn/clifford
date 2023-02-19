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
  });

connection.connect()
  
const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
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


router.get('/get_user', cors(corsOptions), (req, res) => {
    let email = req.query.email;
    console.log(email)
    connection.query(
        `SELECT * FROM users WHERE email="${email}" LIMIT 1;`, (err, results, fields) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(results)
                res.json({"nickname": results[0].nickname, "email": results[0].email})
            }

        }
      )

});

router.get('/update_user', cors(corsOptions), (req, res) => {
    let query = req.query;
    connection.query(
        `UPDATE users SET nickname="${query.nickname}", email="${query.email}" WHERE email="${query.old_email}";`, (err, results, fields) => {
            if(err) {
                console.log(err);
                res.json({result: "failure"})
            }
            else {
                //https://auth0.com/docs/api/management/v2#!/Users/get_users
                //https://manage.auth0.com/dashboard/us/dev-844ihsmwwpk7lzn5/apis/63e141eb1ea09aa7d26ab61b/test
                res.json({result: "success"})
            }

        }
      )
})

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

//connection.end();
module.exports = router;