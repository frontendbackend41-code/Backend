import API_CONFIG from "./config/api.config.js";
import {connect} from "mongoose";

export const conexiondb = async()=>{
    try{
        const resp = await connect(`mongodb+srv://${API_CONFIG.DB_USER}:${API_CONFIG.DB_PASSWORD}@${API_CONFIG.MONGO_URI}`);
        if(!resp) throw new Error("Error en la conexion a la db");
        console.log(`Conexion a la db exitosa!`);
    }catch(error){
        console.log(error);
    }
}
