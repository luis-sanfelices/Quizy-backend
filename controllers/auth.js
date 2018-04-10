const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

require('dotenv').config();

const authController = {
  signup(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).json({ error: 'Must provide a username and password' });
    }
    return User.findOne({ username }, 'username')
      .then((userExists) => {
        if (userExists) {
          return res.status(422).json({ error: 'user already exist' });
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        })
          .then((user) => {
            const token = jwt.sign({ id: user.id }, process.env.SECRETJWT, {
              expiresIn: 86400, // expires in 24 hours
            });
            res.status(200).json({ token, expiresIn: 86400, ui: user.id });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch(err => next(err));
  },
  login(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).json({ error: 'Must provide a username and password' });
    }

    return User.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'user or password are invalid' });
        }
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user.id }, process.env.SECRETJWT, {
            expiresIn: 86400, // expires in 24 hours
          });
          res.status(200).json({ token, expiresIn: 86400, ui: user.id });
        } else {
          return res.status(404).json({ error: 'user or password are invalid' });
        }
      })
      .catch(next);
  },
  me(req, res) {
    return res.status(200).send('hola');
  },
};

module.exports = authController;
