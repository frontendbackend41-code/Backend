import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import { conexiondb } from "./db.js";

import mascotasRoutes from "./routes/mascotasRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// --- CONFIGURACIÓN DE SESIÓN Y PASSPORT PARA GOOGLE AUTH ---
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configuración de la estrategia de Google Auth
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback` // URL absoluta y completa--> la URL que se ponga en el código debe coincidir exactamente con la que se registre en la sección "URIs de redireccionamiento autorizadas" de la credenciales de OAuth 2.0 en la Google Cloud Console.
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Usar el modelo 'Usuario' y buscar por googleId
        let user = await Usuario.findOne({ googleId: profile.id });
  
        if (user) {
          return done(null, user);  //Esta es una función de callback que se debe llamar cuando termina la lógica de buscar/crear usuario.
        } else {
          // Crear un nuevo 'Usuario' con los campos correctos del esquema
          const newUser = new Usuario({
            googleId: profile.id,
            nombre: profile.name.givenName, // Usar 'nombre' en lugar de 'name'
            apellidos: profile.name.familyName || '', // El apellido puede ser opcional
            email: profile.emails[0].value,
            imagen: profile.photos[0].value, // Usar 'imagen' en lugar de 'image'
            // El campo 'password' es opcional y no se establece para Google auth
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  ));
  
  // Serializar y Deserializar usuario para la sesión
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      // Usar el modelo 'Usuario' para buscar por ID
      const user = await Usuario.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  // --- FIN DE LA CONFIGURACIÓN DE PASSPORT PARA GOOGLE AUTH ---

// Rutas
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/productos", productosRoutes);

app.get("/", (req, res) => {
    res.send("Hola desde vercel")
});

conexiondb();

export default app;