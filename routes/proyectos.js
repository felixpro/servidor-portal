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

router.get('/',
  auth,
  proyectoController.obtenerProyectos
)




module.exports = router;
