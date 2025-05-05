import express from "express";
import runQuery from "./rag";
import db from "./database";
import { bookings } from "./database/schema";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/chat", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    res.status(400).json({ error: "Question is required" });
  }
  // Call the runQuery function with the question
  const response = await runQuery(question);
  res.json(response);
});

router.get("/bookings", async (req, res) => {
  const rows = await db.select().from(bookings);
  res.json(rows);
});

export default router;
