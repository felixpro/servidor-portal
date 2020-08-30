const Proyecto = require('../models/Proyecto')
const { body, validationResult } = require('express-validator');


exports.crearProyecto = async (req, res) => {

  // revisar si hay errores
  // Revisar si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({errores: errors.array()})
  }

  try {
  // Crear un nuevo proyecto
  const proyecto = new Proyecto(req.body);

  // guardar el creador via JWT
  proyecto.creador = req.usuario.id;

  // Guardar el proyecto
  proyecto.save();
  res.json(proyecto);


  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

// obtiene todos los proyectos del ususario actual

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({creador: req.usuario.id})
      res.json(proyectos);
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}
