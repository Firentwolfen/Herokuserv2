const jwt = require('jsonwebtoken');

const generarJWT = (id,nombre,tipo) =>{

    return new Promise((resolve, reject) => {
        
        var expiracion ="";
        
        if (tipo =='W') {
            expiracion= '1h';
        } else if (tipo =='A'){
            expiracion = '10m';
        }
        
        const payload = {id,nombre};

        jwt.sign(payload,process.env.JWT_SCRT_SD,{
            expiresIn: expiracion
        },(err,token)=>{

        if (err){
            console.log(err);
            reject ('No se pudo generar el Token');
        }

        resolve (token);
        
        })
    })
    }

module.exports={
    generarJWT
};