import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import {
  addNewAccount,
  deleteAccount,
  editAccount,
  fetchAccounts,
} from "../controllers/finance/accounts.controller.js";
import {
  addNewExpenseCategory,
  deleteExpenseCategory,
  editExpenseCategory,
  fetchExpenseCategory,
} from "../controllers/finance/expense_category.controller.js";

const router: Router = Router();

router.post("/add-account", requireAuth, addNewAccount);
router.get("/fetch-account", requireAuth, fetchAccounts);
router.delete("/delete-account", requireAuth, deleteAccount);
router.patch("/edit-account", requireAuth, editAccount);

router.get("/fetch-expense-category", requireAuth, fetchExpenseCategory);
router.post("/add-expense-category", requireAuth, addNewExpenseCategory);
router.patch("/edit-expense-category", requireAuth, editExpenseCategory);
router.delete("/delete-expense-category", requireAuth, deleteExpenseCategory);
export default router;
