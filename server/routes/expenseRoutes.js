
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

    // Input validation
    if (
      !title ||
      typeof title !== "string" ||
      title.trim().length < 2
    ) {
      return res.status(400).json({
        message: "Title must contain at least 2 characters",
      });
    }

    if (
      amount === undefined ||
      typeof amount !== "number" ||
      amount <= 0
    ) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    if (
      !category ||
      typeof category !== "string" ||
      category.trim().length === 0
    ) {
      return res.status(400).json({
        message: "Valid category is required",
      });
    }

    const expense = await Expense.create({
      title: title.trim(),
      amount,
      category: category.trim(),
    });

    // Broadcast new expense to connected clients
    const io = req.app.get("io");
    io.emit("expenseAdded", expense);

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

    // Broadcast deleted expense ID to connected clients
    const io = req.app.get("io");
    io.emit("expenseDeleted", expense._id.toString());

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
