import express from "express";
import PacoteViagemController from "../controller/PacoteViagemController.js";

const router = express.Router();

router.post("/", PacoteViagemController.create);
router.get("/", PacoteViagemController.findAll);
router.get("/:id", PacoteViagemController.findById);
router.put("/:id", PacoteViagemController.update);
router.delete("/:id", PacoteViagemController.delete);

export default router;
