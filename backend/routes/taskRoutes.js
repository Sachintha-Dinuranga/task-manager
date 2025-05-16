import express from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { ensureAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", ensureAuth, getTasks);
router.post("/", ensureAuth, createTask);
router.get("/:id", ensureAuth, getTaskById);
router.put("/:id", ensureAuth, updateTask);
router.delete("/:id", ensureAuth, deleteTask);

export default router;
