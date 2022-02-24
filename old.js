//router.get('/pacientes/:id', getUserById);//no usado
//router.post('/pacientes', createUser);//no usado
//router.get(`/pacientes`, getUsers);//no usado
//router.put('/pacientes/:id', updateUser)//no usado
//router.delete('/pacientes/:id', deleteUser);//no usado
//router.get('/UserID/:mail', getUserId);//depreciado por redux
//router.get('/Taller/:CodTaller', getTallerInfo); //depreciado por redux

/*const getUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM public."Institucion"');
        //const jsonresp = response.rows;
        //const resultd = je.encrypt(jsonresp);
        //res.json(`${resultd}`);

    res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
    }
    
};*/

/*const getUserById = async (req, res) => {
  try {
    const id = Buffer.from(req.params.id, 'base64').toString();
    const response = await pool.query('SELECT * FROM public."Institucion" WHERE "Cod" = $1', [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  } 
};*/

/*const createUser = async (req, res) => {
   try {
    const { codIns, nomIns} = req.body;
    const response = await pool.query('INSERT INTO public."Institucion"( "Cod", "NombreInstitucion") VALUES ($1, $2)', [codIns, nomIns]);
    res.json({
        message: 'Institution Added successfully',
        body: {
            Institution: { codIns, nomIns}
        }
    }) 
   } catch (error) {
    console.log(error); 
   }

};*/

/*const updateUser = async (req, res) => {
    try {
        const id = Buffer.from(req.params.id, 'base64').toString();
        const  { nomIns } = req.body;
        const response = await pool.query('UPDATE public."Institucion" SET "NombreInstitucion" = $1 WHERE "Cod" = $2', [nomIns,id]);
        res.json(`Institution ${id} Updated Successfully`);
    } catch (error) {
        console.log(error);
    }
};*/

/*const deleteUser = async (req, res) => {
    const id = Buffer.from(req.params.id, 'base64').toString();
    await pool.query('DELETE FROM public."Institucion" where "Cod" = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};*/

//getUsers,  getUserById,    createUser,    updateUser,    deleteUser, getUserId,     getTallerInfo,