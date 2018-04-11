const User = require('../models/user');

const userController = {
  searchUsers(req, res, next) {
    User.find({})
      .then(user => res.status(200).json(user));
    /* Quiz.create({
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
      }); */
    next();
  },
  searchUserById(req, res, next) {
    const { id } = req.params;
    User.findById(id)
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  },
  updateUser(req, res, next) {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;
    User.findByIdAndUpdate(
      id,
      { $set: { email, firstName, lastName } },
      { new: true },
    )
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  },
};

module.exports = userController;

