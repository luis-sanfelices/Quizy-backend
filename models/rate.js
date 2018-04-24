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
  rate: { type: Number, default: 0 },
  date: Date,
});

const Rate = mongoose.model('rate', rankingSchema);

module.exports = Rate;
