const { Pool } = require('pg');
const je = require('json-encrypt');
require('dotenv').config()
const { URL, URLSearchParams } = require('url');
const { verificarNroDocumento, verificarmail, usuariodata2bd, verificarrut, verificartelefono } = require('../helpers/comprobacion');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});


const getHora = async (req, res) => {
    try {
     // const id = Buffer.from(req.params.id, 'base64').toString();
     // SELECT * FROM public."Hora_Agenda_Medica" WHERE "Tomada" = false
     
      const response = await pool.query(`SELECT "CodHAA","Confirmado","Dia", to_char("Fecha",'DD-MM-YYYY') as Fecha, to_char("Hora", 'HH24:MI') as Hora, "Tomada"FROM public."Hora_Agenda_Medica" WHERE "Tomada" = false`);
      res.status(200).json(response.rows);
    } catch (error) {
      console.log(error);
    } 
  };

const updateHora = async (req, res) => {
    try {
        const  { CodHAA, Tomada } = req.body;
        const response = await pool.query('UPDATE public."Hora_Agenda_Medica" SET "Tomada" = $1 WHERE "CodHAA" = $2', [Tomada,CodHAA]);
        res.json(`Hora ${CodHAA} Actualizada correctamente`);
    } catch (error) {
        console.log(error);
    }
};

const createHoraEvaLact = async (req, res) => {
    try {
     const { fechahl, horahl, rutpaciente} = req.body;
     const response = await pool.query(`INSERT INTO public."AgendarHora"("RutEspecialista", "EspecialidadAgendar", "FechaAgendar", "HoraAgendar", "TitularAgendar", "RutPacienteAgendar", "ObservacionesAgendar", "EstadoAgendar") VALUES ('15501472-5','44',$1,$2,true,$3,null,null)`, [fechahl, horahl, rutpaciente]);
     res.json({
         message: 'Hora Creada correctamente',
         body: {
             Variables: { fechahl, horahl, rutpaciente}
         }
     }) 
    } catch (error) {
     console.log(error); 
    }
 
 };

const getTalleresInfo = async (req, res) => {
    try {
        const response = await pool.query('SELECT "CodTaller", "NombreTaller", "NombreEspecialidad", "ObservacionTaller","ImagenTaller","NombreTrabajador","ApellidoPaternoTrabajador","NombreTipoTaller" FROM public."Taller" INNER JOIN public."Especialidad" ON public."Taller"."CodEspecialidadTaller" = public."Especialidad"."CodEspecialidad" INNER JOIN public."Trabajador" ON public."Taller"."RutRelator1Taller" = public."Trabajador"."RutTrabajador" INNER JOIN public."TipoTaller" ON public."Taller"."CodTipoTaller" = public."TipoTaller"."CodTipoTaller"');
       
        //const jsonresp = response.rows;
        //const resultd = je.encrypt(jsonresp);
        //res.json(`${resultd}`);

    res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
    }
    };
    
const getTallerInfo = async (req, res) => {
        
        const Cod_Taller = req.params.CodTaller;
        try {
            const response = await pool.query('SELECT "CodTaller", "NombreTaller", "NombreEspecialidad", "ObservacionTaller","ImagenTaller","NombreTrabajador","ApellidoPaternoTrabajador","NombreTipoTaller" FROM public."Taller" INNER JOIN public."Especialidad" ON public."Taller"."CodEspecialidadTaller" = public."Especialidad"."CodEspecialidad" INNER JOIN public."Trabajador" ON public."Taller"."RutRelator1Taller" = public."Trabajador"."RutTrabajador" INNER JOIN public."TipoTaller" ON public."Taller"."CodTipoTaller" = public."TipoTaller"."CodTipoTaller" WHERE "CodTaller" = $1', [Cod_Taller]);
           
            //const jsonresp = response.rows;
            //const resultd = je.encrypt(jsonresp);
            //res.json(`${resultd}`);
    
        res.status(200).json(response.rows);
        } catch (error) {
            console.log(error);
        }
        };


const getTalleresHoras = async (req, res) => {
        
        const  CodigoTaller  = req.params.CodigoTaller;
        try {
            const response = await pool.query(`SELECT "CodHorasTaller","CodTallerRelac", to_char("FechaHorasTaller",'DD-MM-YYYY') as Fecha, to_char("HoraHorasTaller", 'HH24:MI') as Hora, "Enlace" FROM public."HorasTaller" WHERE "CodTallerRelac" = $1 AND "FechaHorasTaller" > current_date`, [CodigoTaller]);
           
            //const jsonresp = response.rows;
            //const resultd = je.encrypt(jsonresp);
            //res.json(`${resultd}`);
    
        res.status(200).json(response.rows);
        } catch (error) {
            console.log(error);
        }
        };
        
/*const getUserId = async (req, res) => {
        
            const mail = req.params.mail;
            try {
                const response = await pool.query('SELECT "NroDocumentoPcte" FROM public."Paciente" WHERE "EmailPcte" = $1', [mail]);
               
                //const jsonresp = response.rows;
                //const resultd = je.encrypt(jsonresp);
                //res.json(`${resultd}`);
        
            res.status(200).json(response.rows);
            } catch (error) {
                console.log(error);
            }
            };*/

const createAgendTaller = async (req, res) => {
    try {
     const { codigohorataller, rutpaciente} = req.body;
     const response = await pool.query(`INSERT INTO public."AgendaTaller"("CodHorasTaller", "RutPcte", "EstadoTaller") VALUES ($1,$2,'por confirmar')`, [codigohorataller, rutpaciente]);
     res.json({
         message: 'Taller agendado correctamente',
         body: {
             Variables: { codigohorataller, rutpaciente}
         }
     }) 
    } catch (error) {
     console.log(error); 
    }
 
};

const deleteAgendTaller = async (req, res) => {
    try {
     const { codigohorataller, rutpaciente} = req.body;
     const response = await pool.query(`DELETE FROM public."AgendaTaller" WHERE "CodHorasTaller" = $1 AND "RutPcte" = $2;`, [codigohorataller, rutpaciente]);
     res.json({
         message: 'Taller borrado correctamente',
         
     }) 
    } catch (error) {
     console.log(error); 
    }
 
};

//para ver que taller tiene inscrito
const getAgendaTaller = async (req, res) => {

    const codigohorataller = req.params.codtal;
    const rutpaciente = req.params.rutpac;

    try {
        const response = await pool.query('SELECT * FROM public."AgendaTaller" WHERE "CodHorasTaller" = $1 AND "RutPcte" = $2;', [codigohorataller, rutpaciente]);
       
        //const jsonresp = response.rows;
        //const resultd = je.encrypt(jsonresp);
        //res.json(`${resultd}`);

    res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
    }
    };
//para ver que hora tiene inscritos
const getAgendaHoraUser = async (req, res) => {

        const  {rut} = req.body;
    
        try {
            const response = await pool.query('SELECT * FROM public."AgendarHora" WHERE "RutPacienteAgendar" = $1;', [rut]);
           
            //const jsonresp = response.rows;
            //const resultd = je.encrypt(jsonresp);
            //res.json(`${resultd}`);
    
        res.status(200).json(response.rows);
        } catch (error) {
            console.log(error);
        }
        };

const crearUsuario = async (req, res) => {
        
       const jwttipo = req.header('x-jwttipo');


       const {NroDocumento,TipoDocuemnto,Nombre,ApellidoPaterno,ApellidoMaterno, Direccion, Nacionalidad, Email, Contraseña, Telefono, Prevision, FechaNacimiento, EstadoCivil,Furo} = req.body;

       let rutUnico = await verificarNroDocumento(NroDocumento);
       let emailUnico = await verificarmail(Email);
       let name = Nombre +" "+ ApellidoPaterno +" "+ ApellidoMaterno;
    
       //revisar rut & email en la BD
       if (rutUnico == true) {
            return res.status(400).json({
                ok: false,
                message: 'Rut (o Nro Documento) ya se encuentra registrado',
             }) 
        }

       if (emailUnico==true) {
            return res.status(400).json({
                ok: false,
                message: 'Email ya se encuentra registrado',
             }) 
        }

        //encriptar contraseña
        
        const salt =bcrypt.genSaltSync();
        let pswd2bcrpt = bcrypt.hashSync(Contraseña,salt);

        //JWT
        const token = await generarJWT(NroDocumento,name,jwttipo);

        try {
        
        const response = await pool.query('INSERT INTO public."Paciente"("NroDocumentoPcte", "TipoDocumentoPcte", "NombrePcte", "ApellidoPaternoPcte", "ApellidoMaternoPcte", "DireccionPcte", "NacionalidadPcte", "EmailPcte", "ContraseñaPcte", "TelefonoPcte", "PrevisionPcte", "FNacPcte", "ObservacionesPcte", "DocumentoAntiguoPcte", "EstadoCivilPcte", "AvalPcte", "FPPPcte", "FUROcte", "EPTok")VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, null, null, $13, null, null, $14, null)', [NroDocumento,TipoDocuemnto,Nombre,ApellidoPaterno,ApellidoMaterno, Direccion, Nacionalidad, Email, pswd2bcrpt, Telefono, Prevision, FechaNacimiento, EstadoCivil,Furo]);
         res.status(201).json({
            ok: true,
            message: 'Usuario Creado Existosamente',
             body: {
                Id: NroDocumento,
                 Nombre: name, 
                 token
             }
         }) 
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Comuniquese con el Administrador del sistema',   
            })
         console.log(error); 
        }
     
     };

const loginUsuario = async (req, res) => {
        
        const jwttipo = req.header('x-jwttipo');
        const {Email, Contraseña} = req.body;
        const Datosbd = await usuariodata2bd(Email);
        const emailUnico = await verificarmail(Email);   
        

        try {

        if (emailUnico==false) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o Contraseña no son correctos',
             }) 
        }

      const validPassword = bcrypt.compareSync(Contraseña,Datosbd.ContraseñaPcte);

        if (validPassword==false) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña Incorrecta',
             }) 
        }
 
        //JWT
        let name = Datosbd.NombrePcte +" "+ Datosbd.ApellidoPaternoPcte +" "+ Datosbd.ApellidoMaternoPcte;
        const token = await generarJWT(Datosbd.NroDocumentoPcte,name,jwttipo);
       
         res.json({
            ok: true,
            message: 'Usuario Logeado Existosamente',
             body: {
                 DatoUsuario:Datosbd,
                 token
             }
         }) 
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Comuniquese con el Administrador del sistema',   
            })
         console.log(error); 
        }
     };

const revalidarToken = async (req, res = response ) => {

        const { id, name } = req;
    
        console.log(id);
        console.log(name);
        // Generar JWT
        const token = await generarJWT( id, name,'W');
    
        res.json({
            ok: true,
            token
        })
    };
    
const updateavtrurl = async (req, res) => {
       
        const  { rut, url} = req.body;
        const rutUnico = await verificarrut(rut);  

        try {  

            if (rutUnico==false) {
                return res.status(400).json({
                    ok: false,
                    message: 'Datos del Usuario no son correctos',
                 }) 
            }

            await pool.query('UPDATE public."Paciente" SET "Avatar" = $1 WHERE "NroDocumentoPcte" = $2', [url,rut]);
            
            res.json({
                ok: true,
                message: 'Imagen actualizada correctamente',
                 body: {
                   Rut_Paciente_avtr_upld: rut
                 }
             }) 

        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Comuniquese con el Administrador del sistema',   
            })
           console.log(error); 
        }
    };

const updatemailphonepass = async (req, res) => {
       
       //Datos Iniciales con el rut del paciente ara actualizar y verificar si el rut esta en el BD de pg
       const  {rut, Email, Contraseña, Telefono, correonuevo, passwordnuevo, telefononuevo} = req.body;
       const rutUnico = await verificarrut(rut);  
        const Datosbd = await usuariodata2bd(Email);
        const emailUnico = await verificarmail(Email);
        const telefonounico = await verificartelefono(Telefono);
        
        var variable_update= "";

        //el campo a cambiar segun los datos que existen en el body
        if (Email && correonuevo){
            variable_update='EmailPcte';
        } else if (Contraseña && passwordnuevo && !correonuevo){
            variable_update='ContraseñaPcte';
        } else if (Telefono && telefononuevo && !correonuevo) {
             variable_update ='TelefonoPcte';
        } 
         
        

        try {

            // si no existe el rut no haga nada
            if (rutUnico==false) {
                return res.status(400).json({
                    ok: false,
                    message: 'Datos del Usuario no son correctos',
                 }) 
            }

            //si es telefono, correo o contraseña actualiza

            switch (variable_update) {
                case 'EmailPcte':
                console.log('el correo se va a actualizar');
                if (emailUnico==false) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Mail Incorrecto',
                     }) 
                }

                await pool.query('UPDATE public."Paciente" SET "EmailPcte" = $1 WHERE "NroDocumentoPcte" = $2', [correonuevo,rut]);
            
                  res.json({
                ok: true,
                message: 'Correo actualizado correctamente',
              }) 
                  break;
                case 'ContraseñaPcte':
                    console.log('la contraseña se va a actualizar');
 
                    //para verificar si la contraseña vieja es valida
            const validPassword = bcrypt.compareSync(Contraseña,Datosbd.ContraseñaPcte);
    
            if (validPassword==false) {
                return res.status(400).json({
                    ok: false,
                    message: 'Contraseña Incorrecta',
                 }) 
            }

        //para encriptar contraseña actualizada
            const salt = bcrypt.genSaltSync();
            let pswd2bcrpt = bcrypt.hashSync(passwordnuevo,salt);

            await pool.query('UPDATE public."Paciente" SET "ContraseñaPcte" = $1 WHERE "NroDocumentoPcte" = $2', [pswd2bcrpt,rut]);
            
            res.json({
          ok: true,
          message: 'Contraseña actualizada correctamente',
        }) 

                  break;
                case 'TelefonoPcte':
                    console.log('el telefono se va a actualizar'); 
                    if (telefonounico==false) {
                        return res.status(400).json({
                            ok: false,
                            message: 'Telefono incorrecto',
                         }) 
                    }

                    await pool.query('UPDATE public."Paciente" SET "TelefonoPcte" = $1 WHERE "NroDocumentoPcte" = $2', [telefononuevo,rut]);
            
                    res.json({
                  ok: true,
                  message: 'Telefono actualizado correctamente',
                }) 

                 break;

                 default:
                 return res.status(500).json({
                    ok: false,
                    message: 'Faltan los datos para actualizar',   
                })
              }


        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Comuniquese con el Administrador del sistema',   
            })
           console.log(error); 
        }
    };

const updateexpotkn = async (req, res) => {
       
        const  { rut, expotoken} = req.body;
        const rutUnico = await verificarrut(rut);  

        try {  

            if (rutUnico==false) {
                return res.status(400).json({
                    ok: false,
                    message: 'Datos del Usuario no son correctos',
                 }) 
            }

            await pool.query('UPDATE public."Paciente" SET "EPTok" = $1 WHERE "NroDocumentoPcte" = $2', [expotoken,rut]);
            
            res.json({
                ok: true,
                message: 'Token Notf generado correctamente',
                 body: {
                   Rut_Paciente_Ex_tkn: rut
                 }
             }) 

        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Comuniquese con el Administrador del sistema',   
            })
           console.log(error); 
        }
    };

const getEspecialidadInfo = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM public."Especialidad" WHERE "Vigente" = true ORDER BY "CodEspecialidad" ASC ');
       
        //const jsonresp = response.rows;
        //const resultd = je.encrypt(jsonresp);
        //res.json(`${resultd}`);

    res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
    }
    };
const getNacionalidadInfo = async (req, res) => {
        try {
            const response = await pool.query('SELECT "CodigoNac","NombreNac" FROM public."Nacionalidad" ORDER BY "CodigoNac" ASC');
           
            //const jsonresp = response.rows;
            //const resultd = je.encrypt(jsonresp);
            //res.json(`${resultd}`);
    
        res.status(200).json(response.rows);
        } catch (error) {
            console.log(error);
        }
        };

const getMedicoEspeInfo = async (req, res) => {

    const  { medicespec } = req.body;
    try {
        const response = await pool.query('SELECT "RutTrabajador","NombreTrabajador","ApellidoPaternoTrabajador","ApellidoMaternoTrabajador" FROM public."Trabajador" INNER JOIN public."MedicoEspecialidad" ON public."Trabajador"."RutTrabajador" = public."MedicoEspecialidad"."RutMedico" INNER JOIN public."Especialidad" ON public."MedicoEspecialidad"."CodEspecialidad" = public."Especialidad"."CodEspecialidad" WHERE "NombreEspecialidad" = $1', [medicespec]);
       
        //const jsonresp = response.rows;
        //const resultd = je.encrypt(jsonresp);
        //res.json(`${resultd}`);

    res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
    }
    };
const getCreenciasInfo = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM public."Creencias" ORDER BY "CodCreencias" ASC ');
       
        //const jsonresp = response.rows;
        //const resultd = je.encrypt(jsonresp);
        //res.json(`${resultd}`);

    res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
    }
    };
const getPrevision = async (req, res) => {
        try {
            const response = await pool.query('SELECT * FROM public."Prevision" ORDER BY "CodPrevision" ASC ');
           
            //const jsonresp = response.rows;
            //const resultd = je.encrypt(jsonresp);
            //res.json(`${resultd}`);
    
        res.status(200).json(response.rows);
        } catch (error) {
            console.log(error);
        }
        };

const postPresupuesto = async (req, res) => {
     
     const {NroDocumento,FechaPO,CodPrevision,TipoPrevision,Especialidad,NombreDoctor,Comen} = req.body;
     
     try {
         const response = await pool.query('INSERT INTO public."Presupuestos"("Rut", "Fecha_Probable_Operacion", "Prevision", "Tipo_Intervencion", "Especialidad", "Medico_Tratante", "Comentarios_Observaciones") VALUES ($1, $2, $3, $4, $5, $6, $7)', [NroDocumento,FechaPO,CodPrevision,TipoPrevision,Especialidad,NombreDoctor,Comen]);
        
         res.status(201).json({
            ok: true,
            message: 'Presupuesto Creado',
         }) 
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Comuniquese con el Administrador del sistema',   
            })
         console.log(error); 
        }
     
     };

const postVisGuiada = async (req, res) => {

   const {NroDocumento,FechaVisita} = req.body;
   
   try {
       const response = await pool.query(' INSERT INTO public."VisitaGuiada"("Rut_Solicitante", "Fecha Solicitada") VALUES ($1, $2)', [NroDocumento,FechaVisita]);
      
       res.status(201).json({
          ok: true,
          message: 'Visita Creada',
       }) 
      } catch (error) {
          res.status(500).json({
              ok: false,
              message: 'Comuniquese con el Administrador del sistema',   
          })
       console.log(error); 
      }
   
   };

const postBonoPad = async (req, res) => {

    const {NroDocumento,
        Nombre_Medico, 
        Carnet_Prenatal,
        Cedula_Identidad,
        Programa_Medico,
        Informe_Ecografia,
        Hemografia,
        Glicemia,
        VDRL,
        VIH,
        Orina_Completa,
        Flujo_Vaginal,
        Streoticoco_B,
        Chagas  } = req.body;
    
    try {
        const response = await pool.query(' INSERT INTO public."BonoPad"("Rut_Solicitante", "Nombre_Medico", "Carnet_Prenatal", "Cedula_Identidad", "Programa_Medico", "Informe_Ecografia", "Hemografia", "Glicemia", "VDRL", "VIH", "Orina_Completa", "Flujo_Vaginal", "Streoticoco_B", "Chagas") VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)', [NroDocumento,Nombre_Medico,Carnet_Prenatal,Cedula_Identidad,Programa_Medico,Informe_Ecografia,Hemografia,Glicemia,VDRL,VIH,Orina_Completa,Flujo_Vaginal,Streoticoco_B,Chagas]);
       
        res.status(201).json({
           ok: true,
           message: 'Ficha Bono Pad Creada',
        }) 
       } catch (error) {
           res.status(500).json({
               ok: false,
               message: 'Comuniquese con el Administrador del sistema',   
           })
        console.log(error); 
       }
    
    };

const postAcuerNacim = async (req, res) => {
    const {
Rut_Solicitante,
Nombre_Medico,
Nacionalidad,
Creencias ,
Nombre_Gestante ,
Nombre_Acom ,
Fecha_Prob_Parto,
Fecha_Ult_Regla,
Tipo_Parto,
Conversado_Medico,
Acomp_Continuo,
Metd_No_Farma,
Aromaterapia,
Musicoterapia,
Uso_Guateros,
Contacto_Piel,
Permanencia_Bebe,
Lactancia_Materna,
Asesoria_Lactancia,
Firma,
Observaciones,
    } = req.body;
    
    try {
        const response = await pool.query('INSERT INTO public."Acuerdo_Parto"("Rut_Solicitante", "Nombre_Medico", "Nacionalidad", "Creencias", "Nombre_Gestante", "Nombre_Acom", "Fecha_Prob_Parto", "Fecha_Ult_Regla", "Tipo_Parto", "Conversado_Medico", "Acomp_Continuo", "Metd_No_Farma", "Aromaterapia", "Musicoterapia", "Uso_Guateros", "Contacto_Piel", "Permanencia_Bebe", "Lactancia_Materna", "Asesoria_Lactancia", "Firma", "Observaciones") VALUES ( $1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)', [Rut_Solicitante,Nombre_Medico,Nacionalidad,Creencias ,Nombre_Gestante ,Nombre_Acom ,Fecha_Prob_Parto,Fecha_Ult_Regla,Tipo_Parto,Conversado_Medico,Acomp_Continuo,Metd_No_Farma,Aromaterapia,Musicoterapia,Uso_Guateros,Contacto_Piel,Permanencia_Bebe,Lactancia_Materna,Asesoria_Lactancia,Firma,Observaciones,]);
    
        res.status(201).json({
           ok: true,
           message: 'Acuerdo Nacimiento Creada',
        }) 
       } catch (error) {
           res.status(500).json({
               ok: false,
               message: 'Comuniquese con el Administrador del sistema',   
           })
        console.log(error); 
       }
        
        };
    









     //borrar
const getPresupuesto = async (req, res) => {
            try {
                const response = await pool.query('SELECT * FROM public."Presupuestos" ORDER BY "Cod_Presupuesto" ASC  ');
               
                //const jsonresp = response.rows;
                //const resultd = je.encrypt(jsonresp);
                //res.json(`${resultd}`);
        
            res.status(200).json(response.rows);
            } catch (error) {
                console.log(error);
            }
            };
    

module.exports = {
    getHora, 
    updateHora,
    createHoraEvaLact,
    getTalleresInfo,
    getTalleresHoras,
    createAgendTaller,
    deleteAgendTaller,
    getAgendaTaller,
    crearUsuario,
    loginUsuario,
    revalidarToken,
    updateavtrurl,
    updatemailphonepass,
    updateexpotkn,
    getAgendaHoraUser,
    getEspecialidadInfo,
    getNacionalidadInfo,
    getMedicoEspeInfo,
    getCreenciasInfo,
    getPrevision,
    getTallerInfo,
    postPresupuesto,
    postVisGuiada,
    postBonoPad,
    postAcuerNacim,


    getPresupuesto,
};

