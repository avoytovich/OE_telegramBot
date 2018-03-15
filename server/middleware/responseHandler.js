module.exports = (ctrlHandler) => (req, res, next) => {

  ctrlHandler(req, res, next)
    .then(() => {
      res.end();
    })
      .catch((err) => {
        res.send(err);
      });
};
