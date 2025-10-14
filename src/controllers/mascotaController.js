import Mascota from "../models/Mascota.js";
//listado de mascotas
export const listarMascotas = async (req, res) => {
  try {
    const filtros = {};
    const { especie, sexo, estadoAdopcion} = req.query;

    if (especie) filtros.especie = especie;
    if (sexo) filtros.sexo = sexo;
    if (estadoAdopcion) filtros.estadoAdopcion = estadoAdopcion;

    const mascota = await Mascota.find(filtros);
    res.json(mascota);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//crear mascota
export const crearMascota = async (req, res) => {
  try {
    const nueva = await Mascota.create(req.body);
    res.status(200).json(nueva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//actualizar mascota
export const actualizarMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mascota) return res.status(404).json({ error: "Mascota no encontrada" });
    res.json(mascota);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//eliminar mascota
export const eliminarMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByIdAndDelete(req.params.id);
    if (!mascota) return res.status(404).json({ error: "Mascota no encontrada" });
    res.json({ mensaje: "Mascota eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
