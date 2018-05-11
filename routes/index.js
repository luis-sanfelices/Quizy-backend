const controller = require('../controllers');

const appRouter = (app) => {
  app.get('/', controller.hello);
};

module.exports = appRouter;
 