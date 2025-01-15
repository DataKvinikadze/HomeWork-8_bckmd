const postExpenseMiddleware = (req, res, next) => {
  // "category": "Entertainment",
  // "amount": 25
  const { category, amount } = req.body;
  if (!category || !amount) {
    res.status(404).json({ message: "You must enter all fields!" });
  }
  next();
};

module.exports = postExpenseMiddleware;
