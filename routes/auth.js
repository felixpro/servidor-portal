// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')

// Crea un usuario
// api/auth
router.post('/',

    [
      body('email', 'Agrega un email valido').isEmail(),
      body('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    authController.autenticarUsuario
)

// Obtiene el usuario autenticado
router.get('/',
  auth,
  authController.usuarioAutenticado
)

module.exports = router;
