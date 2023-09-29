const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    PORT = 5000
    MONGO_URI = "mongodb+srv://guido:guido@guido0.ybbt6ma.mongodb.net/guido?retryWrites=true&w=majority"
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;