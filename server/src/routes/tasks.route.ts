import { Router } from "express";
import {
  createTask,
  fetchTasks,
  finishTask,
} from "../controllers/tasks.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router: Router = Router();

router.post("/", requireAuth, createTask);
router.get("/", requireAuth, fetchTasks);
router.delete("/", requireAuth, finishTask);

export default router;
