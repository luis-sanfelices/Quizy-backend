const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

require('dotenv').config();

const authController = {
  signup(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).json({ message: 'Must provide a username and password' });
    }
    return User.findOne({ username }, 'username')
      .then((userExists) => {
        if (userExists) {
          return res.status(422).json({ message: 'User already exists' });
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
            const decodedToken = jwt.decode(token);
            res.status(200).json({
              auth: true,
              token,
              expiresIn: decodedToken.exp,
              ui: user.id,
            });
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
      return res.status(422).json({ message: 'Must provide a username and password' });
    }

    return User.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User or password are invalid' });
        }
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user.id }, process.env.SECRETJWT, {
            expiresIn: 86400, // expires in 24 hours
          });
          const decodedToken = jwt.decode(token);
          res.status(200).json({
            auth: true,
            token,
            expiresIn: decodedToken.exp,
            ui: user.id,
          });
        } else {
          return res.status(404).json({ message: 'User or password are invalid' });
        }
      })
      .catch(next);
  },
  me(req, res) {
    return res.status(200).send('hola');
  },
};

module.exports = authController;
