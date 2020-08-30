const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth')



// Crea proyectos
// api/auth
router.post('/',
  auth,
  [
    body('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.crearProyecto
)

// Obtener proyectos
router.get('/',
  auth,
  proyectoController.obtenerProyectos
)

// Actualiza el proyecto
router.put('/:id',
  auth,
  [
    body('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.actualizaProyecto
)



module.exports = router;
