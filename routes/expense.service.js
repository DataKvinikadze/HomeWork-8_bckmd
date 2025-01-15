const fs = require("fs/promises");

const getExpense = async (req, res) => {
  const rawExpense = await fs.readFile("expense.json", "utf-8");
  const expense = JSON.parse(rawExpense);

  if (!req.query.page || !req.query.page) {
    res.json(expense);
  }

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  const peginatedExpense = expense.slice(start, end);

  res.json(peginatedExpense);
};

const postExpense = async (req, res) => {
  const rawExpense = await fs.readFile("expense.json", "utf-8");
  const expense = JSON.parse(rawExpense);
  const { category, amount } = req.body;
  const newExpense = {
    id: expense[expense.length - 1]?.id + 1 || 1,
    category,
    amount,
  };
  expense.push(newExpense);
  await fs.writeFile("expense.json", JSON.stringify(expense));
  res.json({ message: "Expense added successfully", newExpense });
};

const deleteExpense = async (req, res) => {
  const rawExpense = await fs.readFile("expense.json", "utf-8");
  const expense = JSON.parse(rawExpense);

  const expenseId = parseInt(req.params.id);

  const expenseIndex = expense.findIndex((item) => item.id === expenseId);

  if (expenseIndex === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }

  expense.splice(expenseIndex, 1);

  await fs.writeFile("expense.json", JSON.stringify(expense));

  res.json({ message: "Expense deleted successfully", id: expenseId });
};

module.exports = { getExpense, deleteExpense, postExpense };
