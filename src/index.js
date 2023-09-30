const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const displayRoutes = require("express-routemap");

const MONGO_URI = "mongodb+srv://guido:guido@guido0.ybbt6ma.mongodb.net/guido?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const PORT = 5000; // Debes definir PORT dentro de la función connectDB
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    
    const app = express();
    const BASE_PREFIX = process.env.BASE_PREFIX || "api";
    
    app.use(cors());
    app.use(express.json());
    
    app.get(`/`, (req, res) => {
      return res.json({ message: `API DEPLOY SUCCESS` });
    });
    
    app.get(`/${BASE_PREFIX}/data`, async (req, res) => {
      try {
        // Accede a la base de datos y la colección usando mongoose
        const collection = conn.connection.collection("guidocolec");
    
        // Consulta los registros de la colección
        const datos = await collection.find({}, { _id: 0, nombre: 1, apellido: 1 }).toArray();
    
        // Envía los datos como respuesta en formato JSON
        res.json(datos);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
      }
    });

    app.get(`/${BASE_PREFIX}/menu`, async (req, res) => {
      try {
        // Accede a la base de datos y la colección usando mongoose
        const collection = conn.connection.collection("menu");
    
        // Consulta los registros de la colección
        const datos = await collection.find({}, { _id: 0, menu: 1 }).toArray();
   
        // Envía los datos como respuesta en formato JSON
        res.json(datos);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
      }
    });
    
    app.listen(PORT, () => {
      displayRoutes(app);
      console.log(`API RUNNING ON PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();