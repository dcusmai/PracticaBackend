const express = require('express'); // Este archivo va a contener los middewares y va a llamar a las rutas que en este caso van a estar modularizadas
const morgan = require('morgan');

const usersRouter = require('./usersRouter');
const posteosRouter = require('./posteosRouter');

const app = express(); // Este puede ser app o server por convención

// Antes de las rutas coloco siempre los middlewares:
app.use(express.json()) //Este middleware me permite manejar los datos en json
app.use(morgan('dev')) // Esto es un logger que muestra todas las solicitudes y respuestas http, solo se ve en desarrollo (NO EN PRODUCCIÓN)
//Morgan es un middleware que muestra información sobre cada solicitud HTTP,

//Ahora hago mis rutas modularizadas
app.use('/users', usersRouter); // Todas las rutas que defina en usersRouter, van a comenzar con /users/...
app.use('/posteos', posteosRouter); // /posteos/...


module.exports = app;
// const routes = ('express').Router();