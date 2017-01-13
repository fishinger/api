var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    db;

app.get('/', function(req, res) {
    res.send('Hellow API');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/artists', function(req, res) {
    db.collection('artists').find().toArray(function(err, docs) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});
app.get('/artists/:id', function(req, res) {
    //var artist = artists.find(function(artist) {
    //    return artist.id === Number(req.params.id);
    //});
    //res.send(artist);

    db.collection('artists').findOne({_id: ObjectId(req.params.id)}, function(err, doc) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc)
    })
});
app.post('/artists', function(req, res) {
    var artist = {
        name: req.body.name
    }
    db.collection('artists').insert(artist, function(err, result) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    });
});
app.put('/artists/:id', function(req, res) {
    //var artist = artists.find(function(artist) {
    //    return artist.id === Number(req.params.id);
    //});
    //artist.name = req.body.name;
    //res.sendStatus(200);
    db.collection('artists').updateOne(
        {_id: ObjectId(req.params.id)},
        {name: req.body.name},
        function(err, result) {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(result);
        }
    )
});
app.delete('/artists/:id', function(req, res) {
    //artists = artists.filter(function(artist) {
    //    return artist.id !== Number(req.params.id);
    //});
    //res.sendStatus(200);
    db.collection('artists').deleteOne(
        {_id: ObjectId(req.params.id)},
        function(err, result) {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
});
MongoClient.connect('mongodb://localhost:27017/myapi', function(err, database) {
    if(err) {
        return console.log(err);
    }
    db = database;
    app.listen(3012, function() {
        console.log('API start')
    });
})