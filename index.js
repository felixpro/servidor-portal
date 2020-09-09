
const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')

// crear servidor
const app = express();
app.use(express.json());


// conectar a la base de datos
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({extended: true}))

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

// Puerto de la app
const port = process.env.port || 4000;

app.get('/', (req, res) => {
  res.send("Working")
})

// arrancar la app
app.listen(port, '0.0.0.0', () => {
  console.log(`DB connectada ${port}`)
})
