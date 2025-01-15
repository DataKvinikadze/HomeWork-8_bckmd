const express = require("express");

const expenseRouter = require("./routes/expense.route");
const randomRouter = require("./routes/random.route");

const app = express();

app.use(express.json());

app.use("/expense", expenseRouter);
app.use("/random", randomRouter);

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
