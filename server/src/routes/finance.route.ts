import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import {
  addNewAccount,
  deleteAccount,
  editAccount,
  fetchAccounts,
} from "../controllers/finance.controller.js";

const router: Router = Router();

router.post("/add-account", requireAuth, addNewAccount);
router.get("/fetch-account", requireAuth, fetchAccounts);
router.delete("/delete-account", requireAuth, deleteAccount);
router.patch("/edit-account", requireAuth, editAccount);

export default router;
