import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pameleon:leito.2011@krugerbackendapi.cx5kf.mongodb.net/products?retryWrites=true&w=majority&appName=KrugerBackendAP"
    );
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
  }
};
