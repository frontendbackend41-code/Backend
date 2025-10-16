import jwt from "jsonwebtoken";       // ✅ para firmar/verificar JWT
import Usuario from "../models/Usuario.js"; // ✅ modelo de usuario

// ✅ Helper: firma un JWT con el id del usuario y su rol
const sign = (user) =>
    jwt.sign(
    { sub: user._id.toString(), rol: user.rol }, // ✅ payload mínimo
    process.env.JWT_SECRET,                       // ✅ debe existir en .env
    { expiresIn: "1h" }                           // ✅ expira en 1 hora (ajustable)
    );

// ✅ POST /api/auth/register
export const register = async (req, res) => {
    try {
    const { nombre, email, password } = req.body;

    // ✅ Evitamos duplicados por email
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(409).json({ msg: "Email ya registrado" });

    // ✅ Se crea el usuario; el hook pre('save') ya hashea el password
    const user = await Usuario.create({ nombre, email, password });

    // (Opcional) aquí puedes disparar verificación por correo usando utils/email.js

    return res.status(201).json({
        msg: "Registrado",
      user: { id: user._id, email: user.email, rol: user.rol }, // ✅ nunca regresamos el hash
    });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error en registro" });
    }
};

// ✅ POST /api/auth/login
export const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    // ✅ Necesitamos el hash, por eso select("+password")
    const user = await Usuario.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ msg: "Credenciales inválidas" });

    // ✅ Comparamos el password plano con el hash almacenado
    const ok = await user.compararPassword(password);
    if (!ok) return res.status(401).json({ msg: "Credenciales inválidas" });

    // ✅ Firmamos el token con los datos mínimos
    const token = sign(user);

    return res.json({
      token, // ✅ el frontend lo guarda (header/cookie)
      user: { id: user._id, email: user.email, rol: user.rol }, // ✅ datos públicos
    });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error en login" });
    }
};

// ✅ GET /api/auth/me (protegida con middleware auth)
export const me = async (req, res) => {
    try {
    // ✅ req.user viene del middleware, contiene { id, rol }
    const user = await Usuario.findById(req.user.id);
    return res.json({ user });
        } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error en /me" });
        }
};
