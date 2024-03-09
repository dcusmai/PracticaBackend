const app = require('./routes/index'); // Este archivo solo tiene la configuración del servidor. Lo único que hace es levantar el servidor
const { database } = require('./db');

database.sync().then(() => {// Conexión a la DB, devuelve una promesa. Como queremos que se conecte la DB y luego el Server, usamos un .then para que pueda manejar la asincronía
    console.log('Database conected, all Ok!');
    app.listen(3001, () => {
        console.log('Servidor listo en el 3001, capo!')
    })
});
