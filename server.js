const http = require('http');
const { app } = require('./config/config.port');

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log('The server is running at localhost:' + app.get('port'));
});
