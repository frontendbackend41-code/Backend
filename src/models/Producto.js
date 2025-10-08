import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number,
  precio: Number,
  descripcion: String,
  categoria: String,
  fotos: [String],
}, { timestamps: true });

export default mongoose.model("Producto", productoSchema);