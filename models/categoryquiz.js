const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategoryQuizSchema = new Schema({
  categoryName: String,
  categoryId: Number,
  rateCount: Number,
  rateValue: Number,
});

CategoryQuizSchema.virtual('rating').get(function() {
  return this.rateValue ? (this.rateValue / this.rateCount).toFixed(1) : null;
});


CategoryQuizSchema.set('toObject', { getters: true });
const CategoryQuiz = mongoose.model('categoryquiz', CategoryQuizSchema);

module.exports = CategoryQuiz;
