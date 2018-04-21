const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: String,
  correct_answer: String,
  incorrect_answers: [String],
});

const QuizSchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  category: String,
  questions: [questionSchema],
  rateCount: Number,
  rateValue: Number,
});

const Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;
