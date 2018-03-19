module.exports = (ctrlHandler) => (req, res, next) => {

  ctrlHandler(req, res, next)
    .then(() => {
      res.end();
    })
      .catch((err) => {
        res.status(500).send(err);
      });
};
