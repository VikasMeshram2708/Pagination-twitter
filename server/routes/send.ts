import express from "express";
import { sendController } from "../controllers/sendController";
import { getAllMsgController } from "../controllers/getAllMsgController";

const router = express.Router();

router.post("/send", sendController);
router.get("/all", getAllMsgController);

export default router;
