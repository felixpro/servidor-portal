const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://fpuj:f23675641997@cluster0-shard-00-00.xrwsa.mongodb.net:27017,cluster0-shard-00-01.xrwsa.mongodb.net:27017,cluster0-shard-00-02.xrwsa.mongodb.net:27017/taskme?ssl=true&replicaSet=atlas-j9ua48-shard-0&authSource=admin&retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log('hubo un error')
        console.log(error);
        process.exit(1); // Detener la app
    }
}

module.exports = conectarDB;
