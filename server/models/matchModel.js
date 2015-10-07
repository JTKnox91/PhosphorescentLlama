var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
  open: Boolean,
  users: [{
    id: { type: mongoose.Schema.ObjectId, ref: 'User' },
    levelScore: Number,
    totalScore: Number,
    currentLevel: Number,
    plays: Number,
    fails: Number,
    won: Boolean
  }]
});

module.exports = mongoose.model('Match', MatchSchema);
