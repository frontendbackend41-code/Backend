// ✅ Este middleware valida el JWT del header Authorization y deja los datos en req.user
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  // ✅ Leemos el header estándar: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  // ✅ Si no hay token, cortamos con 401
    if (!token) return res.status(401).json({ msg: "No autorizado" });

    try {
    // ✅ Verificamos el token con tu secreto; si es válido, extraemos el payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Guardamos info mínima del usuario en la request para usar en controladores
    req.user = { id: payload.sub, rol: payload.rol };

    // ✅ Pasamos al siguiente middleware/controlador
    return next();
    } catch {
    // ✅ Si el token expira o es inválido, respondemos 401
    return res.status(401).json({ msg: "Token inválido o expirado" });
    }
}
