//https://stripe.com/docs/development/quickstart?lang=node
//step 3 run your first SDK request

const mysql = require('mysql')
const stripe = require('stripe')('sk_test_51MpOudGm81VMr6VhZ9p5XpJoWWy9FpfibFTwrvZkKr0GNhXcvozsT8xWLuWw2OoLgw19jw5S7Dp8bjMcut8wSZqO005jRPIm6G');
var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var axios = require('axios')

const { auth } = require('express-oauth2-jwt-bearer')


var router = express.Router();
router.use(bodyParser.json());



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
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200
}
router.use(cors(corsOptions));
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
                res.json({"id": results[0].id, "nickname": results[0].nickname, "email": results[0].email, "prefs": results[0].prefs})
            }

        }
      )

});

router.get('/get_featured', cors(corsOptions), (req, res) => {
    let params = req.query;
    let limit = 5;
    let table_name;
    console.log(params);
    if(params.mode === 'businesses') {
        table_name = 'sellers';
    } else {
        table_name = 'products';
    }
    if(params.prefs === 'null') {
        connection.query(
            `SELECT * FROM ${table_name} ORDER BY RAND() LIMIT ${limit};`, (err, results, fields) => {
                if(err) {
                    console.log(err);
                }
                else {
                    res.json(results);
                }
            }
        )
    }
    // else {}

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
                /*
                var request = require("request");

                var options = { method: 'POST',
                    url: 'https://dev-844ihsmwwpk7lzn5.us.auth0.com/oauth/token',
                    headers: { 'content-type': 'application/json' },
                    body: '{"client_id":"Dd5QdH5yPUr5Fnulqa6hkX29OkgliyaM","client_secret":"6ivBKMeH7eWSS3rZBcSX8Dmf8ebww9K6ORXsJ62IC39HbsbRDEykifpSbd-NYw_u","audience":"https://dev-844ihsmwwpk7lzn5.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

                request(options, function (error, response, body) {
                    if (error) throw new Error(error);

                    const obj = JSON.parse(body);

                    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRrYWM2OVdKTHJSY0FXdHRwb2pqNCJ9.eyJpc3MiOiJodHRwczovL2Rldi04NDRpaHNtd3dwazdsem41LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJGUlJBZXVyY2xBekY5WlVVZk5wU3Q2ZmZmNWYxbkRNaEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtODQ0aWhzbXd3cGs3bHpuNS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3NjgzMTMxOCwiZXhwIjoxNjc2OTE3NzE4LCJhenAiOiJGUlJBZXVyY2xBekY5WlVVZk5wU3Q2ZmZmNWYxbkRNaCIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.gUlNF2sUaU1sVLmOajR7z8YkroqErWFL8UgNv9fKq2cNsNWdfyU6uxqLyDTUxnH4BvxZVFnCLKwztXqduXmjfOmEyu_eMR42goLJ8wmNMpVx6J1WLGYICfsfrwPSPslSdPeu8yAaMGnC4kQ8HefwXcdYSm7vV_CozbjdyTMTZgyy3qVxQIt2PIKzyVFdvpL-4W0uZ2OVqqImjDCNh0V3vWaT7pcutZCSjH4tVhFXQoRrWlsmlbTBDfYFcMzd8b7srVQJktwRF0pylq30Cu5tKJY0WGL4XXYqt-hmIjHxAQZxDmPGRQtTh2fZNCiJ7Nbtiok20qFSNYvt9NGYhsnsRg";

                    const options = {
                        method: "PATCH",
                        url: "https://dev-844ihsmwwpk7lzn5.us.auth0.com/api/v2/users/auth0|1",
                        headers: { "authorization": `Bearer ${token}`},
                        body: { "email": "email@test.com", "nickname": "nickname"}
                    }

                    axios(options)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                });

                */
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

router.get('/get_seller', cors(corsOptions), (req, res) => { //{id: optional, product_id: optional}

    if(req.query.id) {
        const id = req.query.id;
        connection.query(
            `SELECT * FROM sellers WHERE id="${id}" LIMIT 1;`, (err, results, fields) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(results)
                    res.json(results)
                }
    
            }
          )
    } else {
        const id = req.query.product_id;
        connection.query(
            `SELECT * FROM sellers WHERE product_id=${id} LIMIT 1;`, (err, results, fields) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(results)
                    res.json(results)
                }
    
            }
          )
    }

})

router.get('/get_product', cors(corsOptions), (req, res) => { // {seller_id: null, product_id: null, limit: required if seller_id}
    if(req.query.seller_id) {
        const id = req.query.seller_id;
        const limit = req.query.limit;
        connection.query(
            `SELECT * FROM products WHERE business_id="${id}" LIMIT ${limit};`, (err, results, fields) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(results)
                    res.json(results)
                }
    
            }
          )
    } else { // must have product_id
        const id = req.query.product_id;
        connection.query(
            `SELECT * FROM products WHERE id="${id}";`, (err, results, fields) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(results)
                    res.json(results)
                }
    
            }
        )
    }
})

router.get('/insert/user', cors(corsOptions), (req, res) => {
    //params: {email: email, username: username, prefs,{}}
    //db.insert(users, params) table, to insert (in json)
    console.log("success")
})

router.post('/create-checkout-session', cors(corsOptions), async (req, res) => {
    console.log("create-checkout-session hit")
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                //carrots!
                price: 'price_1MpiRwGm81VMr6VhgQOzmemh',
                quantity: 1,
            },
        ],
        mode: 'payment',
        //only instance i think i have of hardcoding frontend domain, should change in future
        success_url: 'http://127.0.0.1:5173?success=true',
        cancel_url: 'http://127.0.0.1:5173?success=false',
    })

    res.redirect(303, session.url);
})

router.get('/search', cors(corsOptions), (req, res) => { //{query: query, products?: true/false, }
    const products = req.query.products;
    const query = req.query.query;
    console.log("Search query: " + query);
    const limit = 10;
    if(products === "true") { // business_id LIKE "%${query}%" OR 
        connection.query(
            `SELECT * FROM products WHERE
            name like "%${query}%" OR
            description like "%${query}%"
            LIMIT ${limit};`, (err, results, fields) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(results)
                    res.json(results)
                }
    
            }
          )
    } else {
        connection.query(
            `SELECT * FROM sellers WHERE keywords LIKE "%${query}%" OR 
            name like "%${query}%" OR
            description like "%${query}%" OR
            category like "%${query}%"
            LIMIT ${limit};`, (err, results, fields) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(results)
                    res.json(results)
                }
    
            }
          )
    }

})

router.post('/update_cart', cors(corsOptions), (req, res) => {
    const uid = req.body.userid;
    const pid = req.body.productid.toString();
    connection.query(
        `SELECT cart FROM users WHERE id=${uid}
        LIMIT 1;`, (err, results, fields) => {
            if(err) {
                console.log(err);
            }
            else {
                let cart;
                //console.log(results[0].cart)
                if(results[0].cart === undefined || results[0].cart === null) { //cart -> {item1: q1, item2: q2, ...}
                    cart = {};
                    cart[pid] = "1";
                } else {
                    cart = JSON.parse(results[0].cart);
                    cart.hasOwnProperty(pid) ? cart[pid] = (parseInt(cart[pid]) + 1).toString() : cart[pid] = "1"
                }
                connection.query(
                    `UPDATE users SET cart='${JSON.stringify(cart)}' WHERE id=${uid};`, (err, results, fields) => {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            res.json({status: "success"})
                        }
                    }
                )
            }

        }
    )
})

//connection.end();
module.exports = router;