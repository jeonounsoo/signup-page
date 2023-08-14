//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https");
const url = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

const name = req.body.name;
const email = req.body.email;
const password = req.body.password;

const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                NAME: name,
                PASSWOED: password
            }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us13.api.mailchimp.com/3.0/lists/ebf757ba69"

const options = {
    method: "POST",
    auth: "jeonyounsooesa:5f44270b88929550c91186cac384f141-us13"
}

const request = https.request(url, options, function(response) {

if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
} else {
    res.sendFile(__dirname + "/failure.html");
}

 response.on("data", function(data) {
    console.log(JSON.parse(data));
 })
})
request.write(jsonData);

request.end();
});

app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000");
});