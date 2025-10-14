import Producto from "../models/Producto.js";

// Listar productos con filtros
export const listarProductos = async (req, res) => {
  try {
    const filtros = {};
    const { nombre, categoria } = req.query;

    if (nombre) filtros.nombre = nombre;
    if (categoria) filtros.categoria = categoria;

    const productos = await Producto.find(filtros);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};