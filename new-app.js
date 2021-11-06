const exp = require('express');
const app = exp();
const https = require('https');
const bodyParser = require('body-parser');
// const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(exp.static("public"));

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/sign-up.html')

})

app.post('/', function(req, res) {

    let firstname = req.body.fname;

    let secondname = req.body.lname;

    let email = req.body.email;

    // console.log(firstname + ' ' + secondname + ' ' + email)

    var data = {

        members: [{

            email_address: email,

            status: "subscribed",

            merge_fields: {

                FNAME: firstname,

                LNAME: secondname

            }
        }]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/a3c4612c20";

    const options = {

        method: "POST",

        auth: "gowtham1:a3c8cc90eefbcdde54bb9e672021a978-us20"
    }

    request = https.request(url, options, function(response) {
        if (response.statusCode = 200) {

            res.sendFile(__dirname + "/success.html")


        } else {

            res.sendFile(__dirname + "failure.html")

        }

        response.on('data', function(data) {

            // console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);

    request.end();

});

app.post('/failure', function(req, res) {

    res.redirect('/');

});

app.listen(process.env.PORT || "3000", function() {

    console.log('listening on http://localhost:3000');
});

// a3c8cc90eefbcdde54bb9e672021a978-us20 (api key)
// a3c4612c20 (audience id)