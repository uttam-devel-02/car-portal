var express = require('express');
var app = express();
const http = require('http');
var bodyparser = require('body-parser');
var moment = require('moment');
app.use(bodyparser.json({ parameterLimit: 10000000, limit: '90mb' }));
app.use(function (req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,access-token");
    next();
});
/*=========create server=============*/
// listen port 8000
var server = app.listen(8000, function () {
    var host = '127.0.0.1';
    var port = server.address().port;
    console.log("Server is Running at http://%s:%s", host, port);
});

//this id test functions
app.get('/', function (req, resp) {
    resp.send('Test');
});

/*Connect to Database*/
var mongo = require('mongodb');
var db;
var url = 'mongodb+srv://admin:Aadil_khann@cluster0.xvk7v.mongodb.net/db_car?retryWrites=true&w=majority';
var client = mongo.MongoClient;
client.connect(url, function (err, database) {
    if (err) {
        console.log('Error Occoured');
    } else {
        db = database.db('db_car');
        console.log('Sucessfully Connected to Database');
    }
});


/*-------Addorupdate function-------*/
app.post('/addorupdatedata', function (req, resp) {
    var crypto = require('crypto');
    var added_time = moment().unix();

    // this is for add condition start
    if (typeof (req.body.data) != 'undefined' && typeof (req.body.data.password) != 'undefined') req.body.data.password = crypto.createHmac('sha256', req.body.data.password)
        .update('password')
        .digest('hex');
    for (var i in req.body.sourceobj) {
        if (req.body.data[req.body.sourceobj[i]] != null && req.body.data[req.body.sourceobj[i]].length > 2) {
            req.body.data[req.body.sourceobj[i]] = new mongodb.ObjectID(req.body.data[req.body.sourceobj[i]]);
        }
    }


    if (typeof (req.body.data) != 'undefined' && typeof (req.body.data.confirmpassword) != 'undefined') req.body.data.confirmpassword = null;
    var collection = db.collection('cars');
    if (typeof (req.body.data.id) == 'undefined' || (req.body.data.id) == null) {
        console.log("get resp!!!!!!");
        req.body.data['created_at'] = added_time;
        setTimeout(function () {
            collection.insert([req.body.data], function (err, result) {
                if (err) {
                    resp.send(JSON.stringify({ 'status': 'failed', 'id': 0 }));
                } else {
                    resp.send(JSON.stringify({ 'status': 'success', 'res': result.ops[0]._id }));
                    return;
                }
            });
        }, 100);
    }
    // this is for add condition end


    // this is for update condition start
    if (typeof (req.body.data.id) != 'undefined' && req.body.data.id != null) {
        req.body.data['updated_at'] = added_time;
        var o_id = new mongo.ObjectID(req.body.data.id);
        collection.update({ _id: o_id }, { $set: req.body.data }, function (err, resu) {
            resp.send(JSON.stringify({ 'status': 'success', update: 1 }));
            return;
        });
    }
    // this is for update condition end

});


// this is for car list function
app.post('/datalist', function (req, resp) {
    var i = 0;
    var tval;
    var bval;
    var ck;

    var varr = req.body.condition;
    var bvarr = [];
    //console.log(varr.length);
    if (typeof (req.body.condition) != 'undefined') {

        Object.keys(varr).forEach(function (c) {
            // do something with obj[key]
            ck = '_object';
            console.log(c);
            console.log(c.indexOf(ck));
            console.log(ck.indexOf(c));
            if (c.indexOf(ck) >= 0) {
                tavl = varr[c];

                bval = c.replace('_object', '');

                bvarr[bval] = new mongo.ObjectID(varr[c]);
            }
            else bvarr[c] = varr[c];
            i++;
        });

        req.body.condition = Object.assign({}, bvarr);
    }
    if (typeof (req.body.condition) != 'undefined' && typeof (req.body.condition._id) != 'undefined') {
        req.body.condition._id = new mongo.ObjectID(req.body.condition._id);
    }


    if (typeof (req.body.type) != 'undefined' && typeof (req.body.type) != 'null') {
        var collection = db.collection(req.body.source.toString());
        collection.deleteOne({ _id: new mongo.ObjectID(req.body.condition._id) }, function (err, itm) {
            resp.send(JSON.stringify({ "status": "sucess" }));
        })
    } else {
        var cond = req.body.condition;
        var collection = db.collection('cars');
        collection.find(cond).toArray(function (err, items) {
            if (err) {
                console.log(err);
                resp.send(JSON.stringify({ 'res': [] }));

            } else {
                resp.send(JSON.stringify({ 'res': items, 'resc': items.length, status: 200 }));

            }
        })
    }
})


// this is for car delete function by id
app.post('/delete', function (req, resp) {

    var collection = db.collection('cars');
    collection.remove({ _id: new mongo.ObjectID(req.body.id) }, function (err, results) {
        if (err) {
            resp.send(JSON.stringify({ 'status': 'failed' }));
        } else {

            resp.send(JSON.stringify({ 'status': 'success', data: req.body }));
        }
    });
});