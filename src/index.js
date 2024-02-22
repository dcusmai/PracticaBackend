const app = require('./routes/index'); // Este archivo solo tiene la configuración del servidor. Lo único que hace es levantar el servidor



app.listen(3001, () => {
    console.log('Servidor listo en el 3001, capo!')
})