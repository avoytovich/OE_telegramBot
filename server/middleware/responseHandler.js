const { OK } = require('http-statuses');

module.exports = (ctrlHandler) => (req, res, next) => {

  ctrlHandler(req, res, next)
    .then(() => {
      res.status(OK.code).send(OK.message);
      res.end();
      next();
    })
      .catch((err) => res.send(err));
};
