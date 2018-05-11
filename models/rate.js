const mongoose = require('mongoose');

const { Schema } = mongoose;

const rateSchema = new Schema({
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
  category: String,
  rate: { type: Number, default: 0 },
  date: Date,
});

const Rate = mongoose.model('rate', rateSchema);

module.exports = Rate;
