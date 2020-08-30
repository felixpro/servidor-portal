
const express = require('express');
const conectarDB = require('./config/db')

// crear servidor
const app = express();
app.use(express.json());


// conectar a la base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({extended: true}))

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))

// Puerto de la app
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send("Hola bro!")
})

// arrancar la app
app.listen(PORT)
