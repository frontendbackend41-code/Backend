import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import mascotasRoutes from "./routes/mascotasRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/productos", productosRoutes);

app.listen(3000, () => console.log("Servidor iniciado en puerto 3000"));

