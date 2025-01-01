import express, { Router } from "express";
import { InsureNumbersHandler } from "../handlers/insure-numbers.handler";
import { InsureNumbersMiddleware } from "../middleware/insure-numbers.middleware";

const router: Router = express.Router();
router.get(
  "/api/insure-numbers/get-all-insure-numbers",
  InsureNumbersHandler.handleGetAllInsureNumbers,
);

router.get(
  "/api/insure-numbers/get-matching-insure-numbers/:searchString",
  InsureNumbersMiddleware.validateSearchStringParam,
  InsureNumbersHandler.handleGetMatchingInsureNumbers,
);
router.post(
  "/api/insure-numbers/save-new-insure-number/:insureNumber",
  InsureNumbersMiddleware.validateInsureNumberParam,
  InsureNumbersHandler.handleSaveNewInsureNumber,
);

export default router;
