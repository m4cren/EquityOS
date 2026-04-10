import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import {
  addNewAccount,
  fetchAccounts,
} from "../controllers/trading/accounts.controller.js";
import {
  addNewTrade,
  closeTrade,
  fetchTrades,
} from "../controllers/trading/trade.controller.js";

const router: Router = Router();

router.post("/add-account", requireAuth, addNewAccount);
router.get("/fetch-accounts", requireAuth, fetchAccounts);

router.post("/add-trade", requireAuth, addNewTrade);
router.get("/fetch-trades", requireAuth, fetchTrades);
router.patch("/close-trade", requireAuth, closeTrade);

export default router;
