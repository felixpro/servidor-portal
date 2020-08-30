const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const { body, validationResult } = require('express-validator');

// Crea proyectos
// api/auth
router.post('/', proyectoController.crearProyecto)




module.exports = router;
