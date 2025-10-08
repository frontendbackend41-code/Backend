import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const nuevo = await Usuario.create({
      nombre,
      email,
      password: hashed,
      rol,
    });

    res.json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario)
      return res.status(400).json({ error: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, usuario.password);
    if (!match)
      return res.status(400).json({ error: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
