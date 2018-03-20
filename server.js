const http = require('http');
const app = require('./server/app');
const { port } = require('./config/config.port');

const server = http.createServer(app);
server.listen(port, () => {
  console.log('The server is running at localhost:' + port);
});
