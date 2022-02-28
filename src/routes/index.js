const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getTallerInfo, getAgendaTaller, getUsers, getUserId, getUserById, createUser, updateUser, deleteUser, getHora, updateHora,createHoraEvaLact, getTalleresInfo, getTalleresHoras, createAgendTaller,deleteAgendTaller, crearUsuario, loginUsuario, revalidarToken, updateavtrurl, updatemailphonepass, updateexpotkn, getAgendaHoraUser, getEspecialidadInfo, getNacionalidadInfo, getMedicoEspeInfo, getCreenciasInfo, getPrevision, getPresupuesto, postPresupuesto, postVisGuiada, postBonoPad, postAcuerNacim} = require('../controllers/index.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//pacientes en b64 es igual Y2Nkbg==
router.get('/Haa/', getHora);
router.put('/Haa/',updateHora);
router.post('/Evlac', createHoraEvaLact);
router.get('/Talleres', getTalleresInfo);
router.get('/HoraTaller/:CodigoTaller', getTalleresHoras);
router.post('/AgendarTaller', createAgendTaller);
router.delete('/AgendarTaller', deleteAgendTaller);
router.get('/AgendarTaller/:codtal&:rutpac', getAgendaTaller); 
router.get('/Taller/:CodTaller', getTallerInfo); 
router.post('/NuevoUsuario',
[
    check('NroDocumento', 'El Numero de Documento es Obligatorio').not().isEmpty(),
    check('Email', 'El correo es Obligatorio').isEmail(),
    check('Contraseña', 'La contraseña debe ser minimo de 7 caracteres').isLength({ min: 7}),
    validarCampos]
, crearUsuario );

router.post('/IngresoUsuario',
[check('Email', 'El correo es Obligatorio').isEmail(),validarCampos]
, loginUsuario );

router.get('/renew', validarJWT ,revalidarToken );
router.put('/updtavtr',updateavtrurl);
router.put('/updtephp',updatemailphonepass);
router.put('/gettknexpo',updateexpotkn);
router.put('/gethorasuser',getAgendaHoraUser);
router.get('/getEspecialidad',getEspecialidadInfo );
router.get('/getNacionalidad',getNacionalidadInfo );
router.post('/getMedicoEspecialidad',getMedicoEspeInfo);
router.get('/getCreencias',getCreenciasInfo );
router.get('/getPrevision',getPrevision );
router.post('/postPresupuesto',postPresupuesto );
router.post('/postVisitaGuiada',postVisGuiada);
router.post('/postBonoPad',postBonoPad);
router.post('/postAcuerdoNacim',postAcuerNacim);





//borrar
router.get('/getPresupuesto',getPresupuesto );
module.exports = router;


