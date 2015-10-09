var mongoose = require('mongoose');

var matchSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Match', matchSchema);
