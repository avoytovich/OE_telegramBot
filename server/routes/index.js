const { messageController } = require('./../controllers');
const responseHandler = require('../middleware/responseHandler');

module.exports =
  (app) => {
    app.post('/new-message', responseHandler(messageController.message));
  };
