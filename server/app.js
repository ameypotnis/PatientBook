var express = require('express');
var app = express();

var db = [{"name": "Sam", "age": "40"}];

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.get('/patient', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    res.send(db);
});
app.get('/patient/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    res.send(db);
});
app.post('/patient', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    console.log(req.body);
    db.push({"name": req.body.name, "age": req.body.age})
    res.send(db);
});

app.listen(3000);
console.log('Listening on port 3000');
