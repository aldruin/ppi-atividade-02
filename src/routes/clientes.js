import express from "express";
import ClienteController from "../controller/ClienteController.js";

const router = express.Router();

router.post("/", ClienteController.create);
router.get("/", ClienteController.findAll);
router.get("/:id", ClienteController.findById);
router.put("/:id", ClienteController.update);
router.delete("/:id", ClienteController.delete);
router.post("/login", ClienteController.login);

export default router;
