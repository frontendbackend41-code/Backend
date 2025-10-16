import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// Firma de JWT (1 hora, ajustable)
const sign = (user) =>
    jwt.sign(
    { sub: user._id.toString(), rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );


export const register = async (req, res) => {
    try {
        const {
        nombre,
        apellido_paterno,
        apellido_materno,
        username,
        edad,
        telefono,
        direccion,   // objeto completo
        email,
        password,
      rol,         // opcional, default en el modelo es "user"
    } = req.body;

    // Validación mínima
    const requeridos = [nombre, apellido_paterno, apellido_materno, username, email, password];
    if (requeridos.some((v) => !v || String(v).trim() === "")) {
        return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    // Unicidad de email y username
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) return res.status(409).json({ msg: "Email ya registrado" });

    const existeUser = await Usuario.findOne({ username: username.toLowerCase() });
    if (existeUser) return res.status(409).json({ msg: "Username ya registrado" });

    // Payload a crear
    const payload = {
        nombre,
        apellido_paterno,
        apellido_materno,
        username: username.toLowerCase().trim(),
        edad,
        telefono,
        direccion: direccion
            ? {
            calle: direccion.calle,
            numeroInterior: direccion.numeroInterior,
            numeroExterior: direccion.numeroExterior,
            colonia: direccion.colonia,
            codigoPostal: direccion.codigoPostal,
        }
        : undefined,
        email,
        password, // hash en pre('save') del modelo
        rol,
    };

    const user = await Usuario.create(payload);

    return res.status(201).json({
        msg: "Registrado",
        user: {
        id: user._id,
        email: user.email,
        username: user.username,
        rol: user.rol,
        },
    });
        } catch (err) {
            console.error(err);
        return res.status(500).json({ msg: "Error en registro" });
    }
};

export const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ msg: "Credenciales inválidas" });

    const ok = await user.compararPassword(password);
    if (!ok) return res.status(401).json({ msg: "Credenciales inválidas" });

    const token = sign(user);
    return res.json({
        token,
        user: { id: user._id, email: user.email, username: user.username, rol: user.rol },
    });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error en login" });
    }
};


export const me = async (req, res) => {
    try {
    const user = await Usuario.findById(req.user.id);
    return res.json({ user });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error en /me" });
    }
};
