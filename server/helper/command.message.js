const { command } = require('./constants');

module.exports = (query) => {
  let order;
  command.query.some((command,id) => {
    if (command === query) {
      order = id;
    }
    return command === query;
  });
  return command.reply[order];
};
