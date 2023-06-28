const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    delete req.body.password //Para eliminar del body el password y no actualizarlo
    delete req.body.email //Para eliminar del body el email y no actualizarlo
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async (req,res)=>{ // /users/login

    //paso1 : buscar al usurario 
    const {email,password} =req.body

    const user = await User.findOne({where:{email}})

    //paso2 verificar a dicho usuario
    if(!user) return res.status(401).json({message:"Invalid credencials"})

    //paso3 verificar el password y comparar
    const isValidPassword = await bcrypt.compare(password,user.password) //true or false
    if(!isValidPassword)  res.status(401).json({message:"Invalid credencials"})

    //paso4 verificar el password y comparar
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:"1d"}
        
    )

    return res.json({user,token})
})

module.exports = {
    getAll,
    create,
    remove,
    update,
    login
}