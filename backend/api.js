//test@test.com Password!

var express = require('express');
var cors = require('cors')

var router = express.Router();

var corsOptions = {
    origin: "http://127.0.0.1:5173/",
    optionsSuccessStatus: 200
}

router.get('/', cors(), (req, res) => {
    res.json({"data": "nothing right now"})
});

router.get('/sellers', cors(), (req, res) => {
    return // retrieve all sellers from db
})

//sellers route with query options to filter searches

module.exports = router;