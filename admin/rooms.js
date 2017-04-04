var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;


var router = express.Router();

module.exports = router;

var url = "mongodb://localhost:27017/chat";

router.get('/', function (req, res, next) {

    MongoClient.connect(url, function (error, db){
        if(error){ return next(error);}

        db.collection("rooms").find().toArray(function(error, rooms){
            if(error){ next(error);}

            res.render("rooms/list", {
                title: "Admin Rooms",
                rooms: rooms
        });
            db.close();
        });
    });

});

router.route('/add')
  .get(function (req, res) {
    res.render("rooms/add");
  })
  .post(function (req, res, next) {
    var room = {
      name: req.body.name
    };

      MongoClient.connect(url, function (error, db){
          if(error){ return next(error);}

          db.collection("rooms").insertOne( room, function(error, result){
              if(error){ return next(error);}

              res.redirect(req.baseUrl);
              })
          });

  });

router.route('/edit/:id')
  .all(function (req, res, next) {
    var roomId = req.params.id;


      MongoClient.connect(url, function (error, db){
          if(error){return next(error);}

          var filter = { _id: new ObjectID(roomId) };
          db.collection("rooms").find(filter).next(function(error, room){

              if (!room) {
                  res.sendStatus(404);
                  return;
              }
              res.locals.room = room;
              next();

              db.close();
          });
      });

  })
  .get(function (req, res) {
    res.render("rooms/edit");
  })
  .post(function (req, res, next) {
      var roomId = req.params.id;

      MongoClient.connect(url, function (error, db){
          if(error) {return next(error);}

          var filter = { _id: new ObjectID(roomId) };
          var newRoom = {
              name: req.body.name
          };
          db.collection("rooms").replaceOne( filter, newRoom, function(error, result){
              if(error) { return next(error);}

              res.redirect(req.baseUrl);
          });
      });
  });

router.get('/delete/:id', function (req, res, next) {
  var roomId = req.params.id;

    MongoClient.connect(url, function (error, db){
        if(error) {return next(error);}

        var filter = { _id: new ObjectID(roomId)};


        db.collection("rooms").deleteOne( filter, function(error, result){
            if(error) {return next(error);}
            res.redirect(req.baseUrl);
        })
    });
    
});
