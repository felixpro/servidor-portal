// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { body, validationResult } = require('express-validator');

// Crea un usuario
// api/usuario
router.post('/',

    [
      body('nombre', 'El nombre es obligatorio').not().isEmpty(),
      body('email', 'Agrega un email valido').isEmail(),
      body('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario

)

module.exports = router;
