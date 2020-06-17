const { messageController } = require('./../controllers');

module.exports = (app) => {
  app.post('/new-message', messageController.message);
};
