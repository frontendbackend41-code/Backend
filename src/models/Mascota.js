import mongoose from "mongoose";

const mascotaSchema = new mongoose.Schema({
  nombre: String,
  especie: String,
  edad: Number,
  raza: String,
  tamaño: String,
  descripcion: String,
  fotos: [String],
  estadoAdopcion: { type: String, enum: ["disponible", "en proceso", "adoptado"], default: "disponible" }
}, { timestamps: true });

export default mongoose.model("Mascota", mascotaSchema);
