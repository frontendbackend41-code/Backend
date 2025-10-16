import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const direccionSchema = new mongoose.Schema({
    calle: { type: String, required: true },
    numeroInterior: { type: String },
    numeroExterior: { type: String },
    colonia: { type: String, required: true },
    codigoPostal: { type: String, required: true },
});

const usuarioSchema = new mongoose.Schema(
    {
    nombre: { type: String, required: true },
    apellido_paterno: { type: String, required: true },
    apellido_materno: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    direccion: { type: direccionSchema, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    rol: { type: String, enum: ["usuario", "admin"], default: "usuario" },
    emailVerificado: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Encriptar contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Comparar contraseñas al iniciar sesión
usuarioSchema.methods.compararPassword = async function (passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
