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





module.exports = router;
