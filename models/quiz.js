const mongoose = require('mongoose');

const { Schema } = mongoose;

const pictureSchema = new Schema({
  pic_path: String,
  pic_name: String,
});

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
  picture: pictureSchema,
});

QuizSchema.virtual('rating').get(function() {
  return this.rateValue ? (this.rateValue / this.rateCount).toFixed(1) : null;
});


QuizSchema.set('toObject', { getters: true });
const Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;
