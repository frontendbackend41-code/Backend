import API_CONFIG from "./config/api.config.js";
import {connect} from "mongoose";

export const conexiondb = async()=>{
  try{
    const resp = await connect(`mongodb+srv://${API_CONFIG.DB_USER}:${API_CONFIG.DB_PASSWORD}@${API_CONFIG.MONGO_URI}/${API_CONFIG.DB_NAME}?retryWrites=true&w=majority`);
    if (!resp) throw new Error("❌ Error en la conexión a la DB");
    console.log("Conexión a la DB exitosa!");
  }catch(error){
    console.log("❌ Error en la conexión a la DB:", error.message);
  }
};
