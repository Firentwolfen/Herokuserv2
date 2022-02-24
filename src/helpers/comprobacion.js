const { Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

const verificarNroDocumento = async (valor ) => {
    
   try {
       const response= await pool.query('Select exists(SELECT * FROM public."Paciente" WHERE "NroDocumentoPcte" = $1)', [valor]);
             
           return response.rows[0].exists;
       
    } catch (error) {
        console.log(error)
    }
    
}

const verificarmail = async (valor) => {
    
    try {
        const response = await pool.query('Select exists(SELECT * FROM public."Paciente" WHERE "EmailPcte" = $1)', [valor]);
         return response.rows[0].exists;
    } catch (error) {
        console.log(error)
    }
    
 }

 const verificartelefono = async (valor) => {
    
    try {
        const response = await pool.query('Select exists(SELECT * FROM public."Paciente" WHERE "TelefonoPcte" = $1)', [valor]);
         return response.rows[0].exists;
    } catch (error) {
        console.log(error)
    }
    
 }

 const verificarrut = async (valor) => {
    
    try {
        const response = await pool.query('Select exists(SELECT * FROM public."Paciente" WHERE "NroDocumentoPcte" = $1)', [valor]);
         return response.rows[0].exists;
    } catch (error) {
        console.log(error)
    }
    
 }
 
 const usuariodata2bd = async (valor) => {
    
    try {
        const response = await pool.query('SELECT * FROM public."Paciente" WHERE "EmailPcte" = $1', [valor]);
        return response.rows[0];
    } catch (error) {
        console.log(error)
    }
    
 } 


module.exports={
    verificarNroDocumento,
    verificarmail,
    usuariodata2bd,
    verificarrut,
    verificartelefono,
}
