const { Router } = require("express");
const { getExpense, deleteExpense, postExpense } = require("./expense.service");
const deleteMiddleware = require("../middleware/delete.middleware");
const postExpenseMiddleware = require("../middleware/postExpense.middleware");

const expenseRouter = Router();

expenseRouter.get("/", getExpense);
expenseRouter.post("/", postExpenseMiddleware, postExpense);
expenseRouter.delete("/:id", deleteMiddleware, deleteExpense);

module.exports = expenseRouter;
