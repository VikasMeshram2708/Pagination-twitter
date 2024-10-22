import express from "express";
import { getAllMsgController } from "../controllers/getAllMsgController";
import { sendController } from "../controllers/sendController";

const router = express.Router();

router.post("/send", sendController);
router.get("/all", getAllMsgController);

export default router;
