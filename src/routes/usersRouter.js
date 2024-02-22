//USERS
//RUTA GET USERS => Para que traiga todos los usuarios o busque por nombre (query)
//RUTA GET USERS/:ID => Para que me traiga el usuario con el id solicitado (params)
//RUTA  POST USERS => Para crear un nuevo usuario, se le pasa en body el objeto del usuario a crear (body)
//RUTA PUT USERS/:ID => Para editar la informacion de un usuario. Se le pasa en body el objeto con las nuevas propiedades   
//RUTA DELETE USERS/:ID => Para eliminar un usuario

const usersRouter = require('express').Router();
const { getAllUsers, getUsersByName, postUser, updateUser, deleteUser } = require('../controllers/index');

usersRouter.get('/', (req, res) => { // Por ejemplo: recibo por query .../users?name=diego
    //primero debo verificar si recibí info por query para traer todos los users o los que coincidan con el name que me pasan
    const { name } = req.query;

    //si hay query, traer los ususarios que coincidan con el name
    //una vez que los tengo, los mando en la response

    if(name){
        const users = getUsersByName(name); //La fc getUsersByName recibe por parámetro un name desde la query y se lo envía al controlador (index) para que lo busque en el array users 
        // Continuo ej: en users tendría [{name: diego}] un arr, con objbetos de propiedad name que coincidan con diego o error. 
        if(users.error) return res.status(404).json(users); //json parsea la respuesta users que está en JS (users es un array de objetos con propiedad name o error)
        return res.status(200).json(users);
    }
    //si no hay query, traer todos
    //una vez que los tengo, los mando en la response
    else{ // .../users (sin query)
        const users = getAllUsers(); //No le paso nada por parámetro porque va a devolver todo lo que encuentre.
        return res.status(200).json(users); // users=[{...}, {...}, {...}]
    }
});

usersRouter.post('/', (req, res) => {
    const { name, email, username } = req.body;
    
    try { // Uso try-Catch porque voy a lanzar un Error y necesito que algo lo maneje (catch)
        if(!name || !email || !username) throw Error ('Me falta info');

        else{
            const newUser =  postUser( name, email, username );

            return res.status(200).json(`Se creó el usuario: ${newUser.name}`);
        }

    } catch (error) {
        return res.status(404).send(error.message) //  .send(error.message) message es una propiedad del objeto error, en este caso message: 'Me falta info'. Si quiero todo el objeto error .json(error)
    }
});

usersRouter.put('/', (req, res) => {
    const { id, name, email, username } = req.body;

    if(id && (name || email || username)){
        const userUpdated = updateUser(id, name, email, username);

        if(userUpdated.error)res.status(404).json(userUpdated);

        else{
            return res.status(200).json(userUpdated); //'Usuario actualizado correctamente'
        } 
    }
});

usersRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    if(id) {
        const userDeleted = deleteUser(id);

        if(userDeleted.error) return res.status(404).json(userDeleted.error);
        else return res.status(200).json(userDeleted)
    }
})

module.exports = usersRouter;