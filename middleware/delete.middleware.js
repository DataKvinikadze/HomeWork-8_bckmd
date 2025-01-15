const deleteMiddleware = (req, res, next) => {
  const userKey = req.headers["key"];
  const validKey = "data";

  if (!userKey || userKey !== validKey) {
    return res.status(403).json({ message: "no access!" });
  }
  next();
};

module.exports = deleteMiddleware;
