const express = require("express");
const fs = require("fs/promises");

const app = express();

app.get("/expense", async (req, res) => {
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
});

app.delete("/expense/:id", async (req, res) => {
  const userKey = req.headers["key"];
  const validKey = "data";

  if (!userKey || userKey !== validKey) {
    return res.status(403).json({ message: "no access!" });
  }

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
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
