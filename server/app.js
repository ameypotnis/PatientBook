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
    res.send({"firstName": "Sam", "lastName":"Los", "age": "40", "sex": "Male", "history" : [{"key" : "BP", value: "140"}, {"key" : "HB", value: "12"}, {"key" : "TP", value: "140"}, {"key" : "GB", value: "12"}]});
});
app.post('/patient', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    db.push(req.body);
    console.log(db);
    res.send(db);
});
app.post('/patient/addHistory', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    db.push(req.body);
    console.log(db);
});

app.listen(3000);
console.log('Listening on port 3000');
