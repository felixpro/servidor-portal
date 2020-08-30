const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')




exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array()})
  }

// Extraer el email y password
const { email, password} = req.body;

try {

  // Revisar que sea un usuario registradp
  let usuario = await Usuario.findOne({email});
  if (!usuario) {
      return res.status(400).json({msg: 'El usuario no existe'})
  }

  // Si el usuario existe revisa el password.
  const passCorrecto = await bcryptjs.compare(password, usuario.password)
  if (!passCorrecto) {
    return res.status(400).json({msg: "Password Incorrecto"})
  }

  // Si todo es correcto, crear el token porque ya esta authenticado
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
}

}
