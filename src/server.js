import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";
import API_CONFIG from "./config/api.config.js";
import { conexiondb } from "./db.js";
import { seedProductos } from "./seed/seedProductos.js";
import { seedMascotas } from "./seed/seedMascotas.js";
import mascotasRoutes from "./routes/mascotasRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";

const startServer = async () => {
  await conexiondb();
  //Ejecuta los seed si run_seeds está en true, borra y vuelve a subir los datos
  //si es false solo carga una vez los datos si no existen
  if (process.env.RUN_SEEDS === "true") {
      console.log("Ejecutando seeds...");
      await seedMascotas();
      await seedProductos();
    }
};


const app = express();
app.use(cors());
app.use(express.json());

// google auth
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));

app.use(session({
    secret: process.env.SESION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done => {
    return done(null, profile);
})));

passport.serializeUser((user, done) => donde (null, user))
passport.deserializeUser((user, done) => done(null, obj))

app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
app.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/"}), (req, res) => {res.redirect("https://localhost:3000/dashboard")});
app.get("/auth/user", (req, res) => { if(req.user){res.json}else{res.status(400).send("No esta autenticado") } });
app.get("/auth/logout", (req, res) => { req.logout(() => { res.redirect(process.env.FRONTEND_URL) }) });

// Rutas
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/productos", productosRoutes);

const PORT = process.env.PORT || API_CONFIG.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

startServer();