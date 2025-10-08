import Mascota from "../models/Mascota.js";

export const listarMascotas = async (req, res) => {
  try {
    const filtros = req.query;
    const mascotas = await Mascota.find(filtros);
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearMascota = async (req, res) => {
  try {
    const nueva = await Mascota.create(req.body);
    res.json(nueva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const actualizarMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mascota);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const eliminarMascota = async (req, res) => {
  try {
    await Mascota.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Mascota eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
