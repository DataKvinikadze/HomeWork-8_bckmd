const randomNumber = Math.floor(Math.random() * 100) + 1;

const checkUserMiddleware = (req, res, next) => {
  if (randomNumber >= 50) {
    res.status(404).send("Request denied!");
  }
  next();
};

module.exports = checkUserMiddleware;
