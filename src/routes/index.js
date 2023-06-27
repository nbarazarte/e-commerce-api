const express = require('express');
const router = express.Router();
const routerUser = require('./user.router');

// colocar las rutas aquí
router.use('/users', routerUser)


module.exports = router;