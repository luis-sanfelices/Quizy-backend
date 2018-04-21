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
  rate: Number,
  date: Date,
});

const Rate = mongoose.model('ranking', rankingSchema);

module.exports = Rate;
