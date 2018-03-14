const { OK } = require('http-statuses');

module.exports = (ctrlHandler) => (req, res, next) => {

  ctrlHandler(req, res, next)
    .then(() => {
      res.send(OK.message);
      res.end();
    })
      .catch((err) => res.status(500).send(err));
};
