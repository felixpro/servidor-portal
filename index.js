
const express = require('express');


// crear servidor
const app = express();


// Puerto de la app
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send("Hola bro!")
})

// arrancar la app
app.listen(PORT)
