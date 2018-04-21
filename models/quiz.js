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
<<<<<<< HEAD
  rateCount: Number,
  rateValue: Number,
=======
  ranking: [ { user: { type: Schema.Types.ObjectId, ref: 'user' }, score:Number  } ],
>>>>>>> 1d6711e12a0f93aeb13a4b5aaa47cafc76818235
});

const Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;
