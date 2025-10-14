import Mascota from "../models/Mascota.js";

const mascotasSeed = [
  {
    nombre: "Firulais",
    especie: "Perro",
    sexo: "Macho",
    esterilizado: true,
    tamaño: "Grande",
    EstadoSalud: "Sano",
    descripcion: "Perro juguetón y amigable",
    fotos: ["https://images.unsplash.com/photo-1558788353-f76d92427f16"],
    estadoAdopcion: "disponible"
  },
  {
    nombre: "Mishi",
    especie: "Gato",
    sexo: "Hembra",
    esterilizado: true,
    tamaño: "Pequeño",
    EstadoSalud: "Sano",
    descripcion: "Gatita tranquila y cariñosa",
    fotos: ["https://images.unsplash.com/photo-1592194996308-7b43878e84a6"],
    estadoAdopcion: "disponible"
  },
  {
    nombre: "Max",
    especie: "Perro",
    sexo: "Macho",
    esterilizado: true,
    tamaño: "Mediano",
    EstadoSalud: "Sano",
    descripcion: "Bulldog activo y juguetón",
    fotos: ["https://images.unsplash.com/photo-1561948955-570a78a5a4a7"],
    estadoAdopcion: "en proceso"
  },
  {
    nombre: "Luna",
    especie: "Gato",
    sexo: "Hembra",
    esterilizado: true,
    tamaño: "Mediano",
    EstadoSalud: "Sano",
    descripcion: "Gata persa muy dulce",
    fotos: ["https://images.unsplash.com/photo-1623204326838-6507764dc1b6"],
    estadoAdopcion: "adoptado"
  },
  {
    nombre: "Rocky",
    especie: "Perro",
    sexo: "Macho",
    esterilizado: true,
    tamaño: "Grande",
    EstadoSalud: "Sano",
    descripcion: "Pastor Alemán protector y activo",
    fotos: ["https://images.unsplash.com/photo-1612468809721-d431d5c4e3a2"],
    estadoAdopcion: "disponible"
  }
];

export const seedMascotas = async () => {
  try {
    await Mascota.deleteMany({});
    console.log("🧹 Colección de mascotas limpiada.");

    const result = await Mascota.insertMany(mascotasSeed);
    console.log(`✅ ${result.length} mascotas insertadas correctamente!`);
  } catch (err) {
    console.error("❌ Error al insertar mascotas:", err.message);
  }
};