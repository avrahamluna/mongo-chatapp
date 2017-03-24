var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var MongoClient = require("mongodb").MongoClient;

var router = express.Router();
module.exports = router;

var url = "mongodb://localhost:27017/chat";

router.get('/', function (req, res) {


    MongoClient.connect(url, function (error, db){

        db.collection("rooms").find().toArray(function(error, rooms){
            if(error){
                console.error(error);
                return;

            }

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
  .post(function (req, res) {
    var room = {
      name: req.body.name,
      id: uuid.v4()
    };

    rooms.push(room);

    res.redirect(req.baseUrl);
  });

router.route('/edit/:id')
  .all(function (req, res, next) {
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if (!room) {
      res.sendStatus(404);
      return;
    }
    res.locals.room = room;
    next()
  })
  .get(function (req, res) {
    res.render("rooms/edit");
  })
  .post(function (req, res) {
    res.locals.room.name = req.body.name;

    res.redirect(req.baseUrl);
  });

router.get('/delete/:id', function (req, res) {
  var roomId = req.params.id;

  rooms = rooms.filter(r => r.id !== roomId);

  res.redirect(req.baseUrl);
});
