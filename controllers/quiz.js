const Quiz = require('../models/quiz');

const quizController = {
  createQuiz(req, res, next) {
    Quiz.create({
      name: req.body.name,
      category: req.body.category,
      questions: [],
      user: req.decoded.id,
    })
      .then((quiz) => {
        res.status(200).json(quiz);
      })
      .catch((err) => {
        next(err);
      });
  },
  // createQuestion
  createQuestion(req, res, next) {
    const newQuestion = {
      question: req.body.question,
      correct_answer: req.body.correct_answer,
      incorrect_answers: req.body.incorrect_answers,
    };
    Quiz.findOneAndUpdate({ _id: req.params.quizId }, { $push: { questions: newQuestion } })
      .then((quiz) => {
        res.status(200).json(quiz);
      })
      .catch((err) => {
        next(err);
      });
  },
  getAllQuizes(req, res, next) {
    Quiz.find({}, 'name user category rateCount rateValue')
      .then((quizes) => {
        res.status(200).json(quizes);
      })
      .catch((err) => {
        next(err);
      });
  },
  getQuiz(req, res, next) {

  },


};

module.exports = quizController;

