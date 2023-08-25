var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");

//used to serve static files frompublic directory
app.use(express.static("public"));
app.use(cors());

//create user account
app.get("/account/create/:name/:email/:password", (req, res) => {
  const params = req.params;

  dal.create(params.name, params.email, params.password).then((user) => {
    console.log(user);
    res.send(user);
  });
});

//all accounts
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);
