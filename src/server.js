import express from "express";
import cors from "cors";
import API_CONFIG from "./config/api.config.js";
import { conexiondb } from "./db.js";
import { seedProductos } from "./seed/seedProductos.js";
import { seedMascotas } from "./seed/seedMascotas.js";

import mascotasRoutes from "./routes/mascotasRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";

const startServer = async () => {
  await conexiondb();
  //Ejecuta los seed si run_seeds está en true, borra y vuelve a subir los datos
  //si es false solo carga una vez los datos si no existen
  if (process.env.RUN_SEEDS === "true") {
      console.log("Ejecutando seeds...");
      await seedMascotas();
      await seedProductos();
    }
};

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/productos", productosRoutes);

const PORT = process.env.PORT || API_CONFIG.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

startServer();