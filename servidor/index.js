'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
require('dotenv').config();

//Configuracion.
app.set('port', process.env.PORT || 5001);

//Middlewares.
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes(Uso de las rutas a donde se realizara las peticiones).
app.use('/api', require('./routes/accountsRoutes'));
app.use('/api', require('./routes/prendasRoutes'));
app.use('/api', require('./routes/clientePrendaRoutes'));
app.use('/api', require('./routes/tallerPrendaRoutes'));

//Iniciar el servidor.
app.listen(app.get('port'), () => {
    console.log(`Start on port ${app.get('port')}`);
});