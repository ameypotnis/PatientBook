var express = require('express');
var app = express();

patient = require('./db/patients');

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://node.example.com:3000');
    res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');

    if( req.method.toLowerCase() === "options" ) {
        req.method = "PUT";
//        res.send( 200 );
    }
        next();
});

app.get('/patients', patient.findAll);
app.get('/patients/:id', patient.findById);
app.post('/patients', patient.add);
app.put('/patients/:id', patient.update);
app.delete('/patients/:id', patient.delete);



app.listen(3000);
console.log('Listening on port 3000');
