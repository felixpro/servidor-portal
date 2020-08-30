const Proyecto = require('../models/Proyecto')
const { body, validationResult } = require('express-validator');


exports.crearProyecto = async (req, res) => {

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

// Actuzaliza un proyecto
exports.actualizaProyecto = async (req, res) => {

  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({errores: errors.array()})
  }

  const {nombre} = req.body;
  const nuevoProyecto = {};
  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {

    // Revisar el ID
    let proyecto = await Proyecto.findById(req.params.id)

    // Si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    // Verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'})

    }

    // Actualizar
    proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set : nuevoProyecto}, {new: true})
    res.json({proyecto})

  } catch (error) {
      console.log(error)
      res.status(500).send('Hubo un error en el servidor')

  }


}




// Elimina un proyecto por su id
exports.eliminarProyecto = async (req, res) => {

  try {
    // Revisar el ID
    let proyecto = await Proyecto.findById(req.params.id)

    // Si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    // Verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({msg: 'No autorizado'})
    }

    // Eliminar el proyecto
    await Proyecto.findOneAndRemove({_id: req.params.id})
    res.json("Proyecto eliminado");

  } catch (error) {
    console.log(error)
    res.status(500).send('Error en el servidor')
  }

}
