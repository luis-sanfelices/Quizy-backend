const mongoose = require('mongoose');

const { Schema } = mongoose;

const rankingSchema = new Schema({
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
  result: Number,
  date: Date,
});


const Ranking = mongoose.model('ranking', rankingSchema);

module.exports = Ranking;
