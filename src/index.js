const express = require("express");
const displayRoutes = require("express-routemap");
const cors = require("cors");
const { MongoClient } = require("mongodb"); // Importa MongoClient de mongodb

const PORT = process.env.PORT || 8080;

const app = express();

const BASE_PREFIX = process.env.BASE_PREFIX || "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// URL de conexión a MongoDB Atlas
const uri = "mongodb+srv://guido:guido@guido0.ybbt6ma.mongodb.net/?retryWrites=true&w=majority";

app.use("/static", express.static(`${__dirname}/public`));

app.get(`/`, (req, res) => {
  return res.json({ message: `API DEPLOY SUCCESS` });
});

//// Mueve la conexión a la base de datos fuera de la ruta
//const client = new MongoClient(uri, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//});
//
//async function connectToDatabase() {
//  try {
//    await client.connect();
//    console.log('Connected to MongoDB');
//  } catch (error) {
//    console.error('Error connecting to MongoDB:', error);
//  }
//}
//
//// Llama a la función para conectar a la base de datos al iniciar la aplicación
//connectToDatabase();
//
//app.get(`/${BASE_PREFIX}/data`, async (req, res) => {
//  try {
//    // Accede a la base de datos y la colección
//    const database = client.db("guido");
//    const collection = database.collection("guidocolec");
//
//    // Consulta los registros de la colección
//    const datos = await collection.find({}, { _id: 0, nombre: 1, apellido: 1 }).toArray();
//
//    // Envía los datos como respuesta en formato JSON
//    res.json(datos);
//  } catch (error) {
//    console.error('Error al obtener datos:', error);
//    res.status(500).json({ error: 'Error al obtener datos' });
//  }
//});

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

app.post("/books", (req, res) => {
  const data = readData();
  const body = req.body;
  const newBook = {
    id: data.books.length + 1,
    ...body,
  };
  data.books.push(newBook);
  writeData(data);
  return res.json(newBook);
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API RUNNING ON PORT ${PORT}`);
});