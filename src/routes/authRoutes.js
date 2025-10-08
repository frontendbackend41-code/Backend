import { Router } from "express";
import { registrarUsuario, loginUsuario } from "../controllers/authController.js";

const router = Router();

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);

export default router;
