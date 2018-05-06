const mongoose = require('mongoose');

const { Schema } = mongoose;

const challengeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'quiz',
    index: true,
  },
  challenger: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
  },
  challengerResult: Number,
  userResult: Number,
  finished: Boolean,
  date: Date,
});

const Challenge = mongoose.model('challenge', challengeSchema);

module.exports = Challenge;
