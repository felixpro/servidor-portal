const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

  // Revisar si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({errores: errors.array()})
  }

  // extrae email y password
  const {email, password } = req.body;

  try {

  // Si usuario es igual a algun email encontrado en la DB entonces no lo guardes
    let usuario = await Usuario.findOne({email});

  if (usuario) {
    return res.status(400).json({msg: 'El usuario ya existe'})
  }
  // guardar el nuevo usuario si no existe el email en la base de datos
    usuario = new Usuario(req.body);

  // Hashear el password
  const salt = await bcryptjs.genSalt(10);
  usuario.password = await bcryptjs.hash(password, salt);

  // guardar usuario
    await usuario.save();

    // Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };
    // firmar el JWt
    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600000
    }, (error, token) => {
      if (error) {
        throw error;
      }
      // mensaje de confirmacion
        res.json({token})
    });


  } catch (error) {
    console.log(error)
    res.status(400).send("Hubo un error incertando el registro");
  }

}
