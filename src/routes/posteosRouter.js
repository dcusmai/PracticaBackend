//POSTEOS

const posteosRouter = require('express').Router(); 
const { postPosteos } = require('../controllers/index');

//RUTA POST => Para crear un nuevo posteo
posteosRouter.post('/', (req, res) => {
    try {
        const { userId, title, contents } = req.body;
        
        if(!userId || !title || !contents) throw Error('Me falta info');
        
        else{
            const newPost = postPosteos(userId, title, contents);
            
            return res.status(200).json(newPost);
        }
        
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

//RUTA GET POSTS => Para que me traiga todos los posteos
//RUTA GET/:ID => Para que me traiga un posteo específico
//RUTA PUT => Para modificar el posteo
//RUTA DELETE => Para borrar un posteo

module.exports = posteosRouter