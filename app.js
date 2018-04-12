const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const userRoutes = require('./routes/user');
const middlewares = require('./helpers/middlewares');

const app = express();

require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
  mongoose.connect(process.env.DATABASE);
} else {
  mongoose.connect(process.env.DATABASE);
}
app.use(middlewares.CORS(process.env.ALLOW_ORIGIN));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
authRoutes(app);
quizRoutes(app);
userRoutes(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((error, req, res) => {
  // set locals, only providing error in development
  // console.log(error);
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // send error
  res.status(error.status || 500);
  res.json({ error: error.statusMessage });
});

module.exports = app;
