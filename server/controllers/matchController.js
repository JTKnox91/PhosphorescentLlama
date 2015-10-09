var Match = require('../models/matchModel.js');

var matchController = {};

matchController.getAllMatches = function(req, res) {
  var userId = req.session.passport.user;
  Match.find().populate('users.id')
    .exec(function(err, matches) {
    if(err){
      res.status(404).send(err);
    } else {
      matches = matches.filter(function (match) {
        for (var i = 0; i < match.users.length; i++) {
          if(match.users[i].id._id.toString() === userId){
            return true;
          }
        }
        return false;
      });
      res.status(200).send(matches);
    }
  });
};

matchController.getMatchById = function(req, res) {
  Match.find({_id: req.params.id}).populate('users.id', function(err, match) {
    if(err){
      res.status(404).send(err);
    } else {
      res.status(200).send(match);
    }
  });
};

matchController.createMatch = function(req, res) {
  console.log(req.session.passport.user);
  console.log(req.body.otherId);
  Match.create({
    open: false,
    users: [
    {
      id: req.session.passport.user,
      levelScore: 100,
      totalScore: 0,
      currentLevel: 1,
      plays: 0,
      fails: 0,
      won: false
    },
    {
      id: req.body.otherId,
      levelScore: 100,
      totalScore: 0,
      currentLevel: 1,
      plays: 0,
      fails: 0,
      won: false
    }]
  }).then(function (match) {
    res.status(201).send(match);
  }, function (err) {
    res.status(500).send(err);
  });
};

matchController.updater = function(matchObject, req) {
  for (var i = 0; i < matchObject.users.length; i++) {
    if (matchObject.users[i].id === req.session.passport.user){
      matchObject.users[i].plays += req.body.play;
      matchObject.users[i].fails += req.body.fail;
      matchObject.users[i].levelScore -= (req.body.play * 5 + req.body.fail * 10);

      if(matchObject.users[i].currentLevel !== req.body.currentLevel) {
        matchObject.users[i].totalScore += matchObject.users[i].levelScore;
        matchObject.users[i].currentLevel = req.body.currentLevel;
        matchObject.users[i].levelScore = 100 + req.body.currentLevel * 20;
      }

    } else {
      matchObject.users[i].won = req.body.forfeit;
    }
  }
  matchObject.open = !req.body.forfeit;
  return matchObject;
};

matchController.updateMatch = function(req, res) {
  Match.findById(req.params.id, function(err, match) {
    if(err){
      res.status(404).send(err);
    } else {
      match = matchController.updater(match, req);
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

module.exports = matchController;
