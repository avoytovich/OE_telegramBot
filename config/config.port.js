const app = require('../server/app');

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

module.exports = {
  port,
  app
};