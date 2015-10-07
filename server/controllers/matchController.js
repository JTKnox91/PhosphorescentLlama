var Match = require('../models/matchModel.js');

var matchController = {};

matchController.getAllMatches = function(req, res) {
  Match.find({}, function(err, matches) {
    if(err){
      res.status(404).send(err);
    } else {
      res.status(200).send(matches);
    }
  });
};

matchController.getMatchById = function(req, res) {
  Match.find({_id: req.params.id}, function(err, match) {
    if(err){
      res.status(404).send(err);
    } else {
      res.status(200).send(match);
    }
  });
};

matchController.createMatch = function(req, res) {
  Match.create({
    open: false,
    users: [
    {
      id: req.session.passport.user,
      levelScore: 0,
      totalScore: 0,
      currentLevel: 0,
      plays: 0,
      fails: 0,
      won: false
    },
    {
      id: req.body.otherId,
      levelScore: 0,
      totalScore: 0,
      currentLevel: 0,
      plays: 0,
      fails: 0,
      won: false
    }]
  });
};

matchController.updateMatch = function(req, res) {
  Match.findById(req.params.id, function(err, match) {
    if(err){
      res.status(404).send(err);
    } else {
      for (var i = 0; i < match.users.length; i++) {
        if (match.users[i].id === req.session.passport.user){
          match.users[i].plays = req.body.plays;
          match.users[i].fails = req.body.fails;
        } else {
          match.users[i].won = req.body.forfeit;
        }
      }
      match.open = !req.body.forfeit;
      match.save(function(err, match) {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(202).send(match);
        }
      });
    }
  });
};
