import express from "express";
import { addKhalti, verifyTransaction } from "../controller/khaltiController.js"; // ✅ INCLUDE .js

const router = express.Router();

router.post("/initiate", addKhalti);
router.post("/verify", verifyTransaction);

export default router;
