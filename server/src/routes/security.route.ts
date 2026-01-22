import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import {
  checkIfPinExist,
  createNewPin,
} from "../controllers/security.controller.js";

const router: Router = Router();

router.get("/", requireAuth, checkIfPinExist);
router.post("/new-pin", requireAuth, createNewPin);

export default router;
