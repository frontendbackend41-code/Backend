import { Router } from "express";
import * as ctrl from "../controllers/authController.js"; // ✅ importamos controladores (register, login, me)
import auth from "../middlewares/auth.js";               // ✅ middleware de validación JWT

const router = Router();

// ✅ Registro y login son públicos
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);

// ✅ /me requiere JWT válido (se valida en el middleware)
router.get("/me", auth, ctrl.me);


export default router; // ✅ ESM
