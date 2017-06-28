
var express = require("express");

var os = require('os');
var chatDB = require("../data/chatDB");

var router = express.Router();
module.exports = router;


router.get('/', function (req, res) {

    chatDB.connectMongoose
        .then(() => chatDB.User.find().exec())
    .then(function(users){
        res.render("users/list", {
            title: "Admin Users",
            users: users
        });
    });


});

router.route('/add')
  .get(function (req, res) {
    res.render("users/add");
  })
  .post(function (req, res) {
    var user = new chatDB.User();

    userFromRequestBody(user, req);

     user.save()
         .then(() => res.redirect(req.baseUrl));
  });

function userFromRequestBody(user, request) {
  user.alias = request.body.alias;
  user.roles = request.body.roles;
  user.contact = {
    phone: request.body["contact.phone"],
    email: request.body["contact.email"]
  };
  user.address = {
    lines: request.body["address.lines"].split(os.EOL),
    city: request.body["address.city"],
    state: request.body["address.state"],
    zip: request.body["address.zip"]
  };
}

router.route('/edit/:id')
  .all(function (req, res, next) {
    var userId = req.params.id;

    chatDB.User.findById(userId).exec()
        .then(user =>{
            if (!user) {
                res.sendStatus(404);
                return;
            }
            res.locals.user = user;
            res.locals.userHasRole = function (role) {
                return (user.roles || []).indexOf(role) > -1
            };
            next()
        });


  })
  .get(function (req, res) {
    res.render("users/edit");
  })
  .post(function (req, res) {
    userFromRequestBody(res.locals.user, req);
    res.locals.user.save()
        .then(() =>  res.redirect(req.baseUrl));

  });



router.get('/delete/:id', function (req, res) {
  var userId = req.params.id;

    chatDB.User.findByIdAndRemove(userId)
        .then(() => res.redirect(req.baseUrl));

});
