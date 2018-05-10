const mongoose = require('mongoose');

const { Schema } = mongoose;

const rankingSchema = new Schema(
  {
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
    category: {
      type: String,
      index: true,
    },
    result: { type: Number, default: 0 },
    date: Date,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);


const Ranking = mongoose.model('ranking', rankingSchema);

module.exports = Ranking;
