import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

/* GET all expenses */
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
});

/* POST a new expense */
router.post("/", async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || amount === undefined || !category) {
      return res.status(400).json({
        message: "Title, amount and category are required",
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expense",
      error: error.message,
    });
  }
});

/* DELETE an expense */
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
});

export default router;