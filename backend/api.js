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

module.exports = router;