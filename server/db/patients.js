var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('patientdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'patientdb' database");
        db.collection('patients', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'patients' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.findById = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    var id = req.params.id;
    console.log('Retrieving patient: ' + id);
    db.collection('patients', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            console.log('FFF' + JSON.stringify(item));
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    db.collection('patients', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.add = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    var patient = req.body;
    console.log('Adding patient: ' + JSON.stringify(patient));
    db.collection('patients', function(err, collection) {
        collection.insert(patient, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.update = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    var id = req.params.id;
    var patient = req.body;
    console.log('Updating patient: ' + id);
    console.log(JSON.stringify(patient));
    db.collection('patients', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, patient, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating patient: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(patient);
            }
        });
    });
}

exports.delete = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-type","text/json");
    var id = req.params.id;
    console.log('Deleting patient: ' + id);
    db.collection('patients', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}