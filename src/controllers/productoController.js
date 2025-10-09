import Producto from "../models/Producto.js";

export const listarProductos = async (req, res) => {
  try {
    const filtros = req.query;
    const Productos = await Producto.find(filtros);
    res.json(Productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const nueva = await Producto.create(req.body);
    res.json(nueva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const Producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
