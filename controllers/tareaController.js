const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')

const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')



exports.crearTarea = async (req, res) => {

  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({errores: errors.array()})
  }



  try {
    // Extraer el proyecto y comprobar si existe
    const {proyecto} = req.body;
    const existeProyecto = await Proyecto.findById(proyecto)

    // Si el proyecto existe o no
    if (!existeProyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    // Revisar si el proyecto actual, pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'})
    }

    // Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea })


  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }


}
