const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth')





// api/tareas
router.post('/',
auth,
[
  body('nombre', 'El nombre es obligatorio').not().isEmpty(),
],
tareaController.crearTarea
)


// obtener las tareas
router.get('/',
auth,
tareaController.obtenerTareas
)


// Actualizar tareas
router.put('/:id',
auth,
tareaController.actualizarTarea
)

// Eliminar las tareas
router.delete('/:id',
auth,
tareaController.eliminarTarea
)

module.exports = router;
