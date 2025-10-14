import Producto from "../models/Producto.js";

const productosSeed = [
  {
    nombre: "Collar para perro",
    cantidad: 10,
    precio: 150,
    descripcion: "Collar ajustable para perro",
    categoria: "Accesorios",
    fotos: ["https://images.unsplash.com/photo-1592194996308-7b43878e84a6"]
  },
  {
    nombre: "Comida para gato",
    cantidad: 20,
    precio: 300,
    descripcion: "Comida premium para gato adulto",
    categoria: "Alimento",
    fotos: ["https://images.unsplash.com/photo-1558788353-f76d92427f16"]
  },
  {
    nombre: "Juguete para perro",
    cantidad: 15,
    precio: 120,
    descripcion: "Juguete interactivo resistente",
    categoria: "Juguetes",
    fotos: ["https://images.unsplash.com/photo-1561948955-570a78a5a4a7"]
  },
  {
    nombre: "Rascador para gato",
    cantidad: 8,
    precio: 500,
    descripcion: "Rascador de varios niveles",
    categoria: "Juguetes",
    fotos: ["https://images.unsplash.com/photo-1623204326838-6507764dc1b6"]
  },
  {
    nombre: "Cama para perro",
    cantidad: 5,
    precio: 800,
    descripcion: "Cama cómoda y lavable",
    categoria: "Muebles",
    fotos: ["https://images.unsplash.com/photo-1612468809721-d431d5c4e3a2"]
  }
];

export const seedProductos = async () => {
  try {
    await Producto.deleteMany({});
    console.log("🧹 Colección de productos limpiada.");

    const result = await Producto.insertMany(productosSeed);
    console.log(`✅ ${result.length} productos insertados correctamente!`);
  } catch (err) {
    console.error("❌ Error al insertar productos:", err.message);
  }
};