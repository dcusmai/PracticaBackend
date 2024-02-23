//POSTEOS

const posteosRouter = require('express').Router(); 
const { postPosteos, getAllPosts, getPostById, modifyPost, deletePost } = require('../controllers/index');

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
posteosRouter.get('/', (req, res) => {
    const  allposts = getAllPosts();
    return res.status(200).json(allposts);
});


//RUTA GET/:ID => Para que me traiga un posteo específico
posteosRouter.get('/:id', (req,res)=>{
    
    const { id } = req.params;
    const post = getPostById(id);
    console.log(post);
    
    if (!post) return res.status(404).json(error.message);
    else{
        return res.status(200).json(post);
    }
});

//RUTA PUT => Para modificar el posteo
posteosRouter.put('/', (req, res) => { // Si quiero recibir id por params tengo que poner '/:id'
    //const { userId } = req.params; // También podría recibir user id por params y el resto de la info por body
    const { id, title, contents } = req.body;
    
    if(id && (title || contents)){
        const editPost = modifyPost(id, title, contents);
        
        if (!editPost) return res.status(404).json({ message: 'No se ha encontrado este Post' });

        return res.status(200).json(editPost);
    }
});

//RUTA DELETE => Para borrar un posteo
posteosRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deleted = deletePost(id);

    if(!deleted){
        return res.status(404).json({ message: "El Post no existe" })
    }else{
        return res.status(200).json(deleted);
    }
});


module.exports = posteosRouter