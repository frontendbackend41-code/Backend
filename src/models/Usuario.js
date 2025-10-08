import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  contraseña: String,
  rol: { type: String, enum: ["admin", "adoptante"], default: "adoptante" }
}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);
