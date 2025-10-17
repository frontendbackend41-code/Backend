import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import API_CONFIG from "./config/api.config.js";
import { conexiondb } from "./db.js";
import { seedProductos } from "./seed/seedProductos.js";
import { seedMascotas } from "./seed/seedMascotas.js";
import mascotasRoutes from "./routes/mascotasRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());


// Rutas
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/productos", productosRoutes);

app.get("/", (req, res) => {
    res.send("Hola desde vercel")
});

conexiondb();

export default app;