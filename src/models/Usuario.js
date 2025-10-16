// ✅ ESM: imports modernos acordes a "type: module"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ✅ Definición del esquema del usuario para MongoDB/Mongoose
const usuarioSchema = new mongoose.Schema(
    {
    nombre: { type: String, required: true },
    email:  { type: String, required: true, unique: true, lowercase: true }, // ✅ único y en minúsculas
    password: { type: String, required: true, minlength: 8, select: false }, // ✅ select:false oculta el hash por defecto
    rol: { type: String, enum: ["user", "admin"], default: "user" },         // ✅ rol sencillo
    emailVerificado: { type: Boolean, default: false },                      // ✅ útil si luego verificas correo
    },
  { timestamps: true } // ✅ crea createdAt/updatedAt
);

// ✅ Hook: antes de guardar, si cambió el password, lo hasheamos
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ✅ Método de instancia: comparar password plano vs hash
usuarioSchema.methods.compararPassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

// ✅ ESM: export default del modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
