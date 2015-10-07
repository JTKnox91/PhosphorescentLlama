var User = require('../models/userModel.js');

var controller = {};

// A custom middleware for Passport
controller.findUserById = function( req, res, next ) {
  var id;
  if (req.session.passport) {
    if( req.session.passport.user ) {
      console.log( 'USER IS: ', req.session.passport.user );
    }
    id = req.session.passport.user;
  }

  User.findById(id, function(error, user){
      if (error) {
        res.status(404).send('Error: Passport session user not found');
      } else if(!user){
        next();
      }
        res.set(user);
        next();
      });
};

controller.getUsers = function ( request, response, next ) {
  User.find({}, function (error, users){
    if( error ) {
      response.status( 404 ).send( );
    } else {
      response.status( 200 ).send( users );
    }
  });
};

module.exports = controller;
