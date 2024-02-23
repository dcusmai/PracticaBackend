let users = [];
let posteos = [];



const getAllUsers = () => users;

const getUsersByName = (name) => {
    const usersFiltered = users.filter(user => user.name === name);

    if(usersFiltered) return usersFiltered;
    return { error: `No hay usuarios con nombre: ${name}`}

    //usersFiltered ? usersFiltered : { error: `No hay usuarios con nombre: ${name}`} //otra forma con ternarios
};

const getUsersById = (id) => {
    const userFound = users.find(user => user.id === Number(id)); 
    
    if(!userFound){
        return{error:`El usuario con el ID "${id}" no existe.`}
    }else{
        return userFound;
    }
};

let id = 1;
const postUser = (name, email, username) => {
    const newUser = {
        name,
        email,
        username,
        id: id++,
        posts: []
    };

    users.push(newUser);
    return newUser; // Acá podría devolver también un mensaje de ususario creado con éxito
};

const updateUser = (id, name, email, username) => {
    const user = users.find(user => user.id === id); // find no devuelve un nuevo objeto, sino el original (a diferencia de filter). Por eso, cualquier modificación que hagamos, modifica el original 

    if(!user){
        return {error: 'Usuario no encontrado'}
    } else{
        // name ? user.name = name // Esta forma tiene un problema: como los ternarios tienen un return implícito, apenas encuentra uno de los parámtros (ej name), corta y no mira si están los demás. Para solucionarlo, debería usar paréntesis o hacer un ternario por parámetro.
        // : email ? user.email = email
        // : username ? user.username = username
        // : null;

         if(name) user.name = name; // Otra forma de hacer lo mismo que arriba, pero así sí evalúa todos los parámetros.
         if(email) user.email = email;
         if(username) user.username = username;

        return user;
    }
};

const deleteUser = (id) => {
    const user =  users.find(user => user.id === parseInt(id)); // Tengo que parsear id porque viene de params como string, no como número. También podría usar number()
    
    if (!user) return {error: 'Usuario no encontrado'};
    else{
        users = users.filter(user => user.id !== Number(id)); // Con esto piso el array users con una copia filtrada (filter devuelve un nuevo arr) sin el user cuyo id coincide con el que pasé por params

        // OTRA FORMA:
        /* const usersFiltered = users.filter(user => user.id !== Number(id))
        users = usersFiltered
        */

        return users;
    }
};


// POSTEOS

let postId = 1;
const postPosteos = (userId, title, contents) => {
    const newPost = {
        userId,
        title,
        contents,
        id: postId++
    }

    posteos.push(newPost);

    const findUser = users.find(
        user => user.id ===  userId
    );

    findUser.posts.push(newPost);

    return newPost;
};

const getAllPosts = () => posteos;

const getPostById = (id) => {
    const postsFiltered = posteos.find((post) => post.id === Number(id));

    if(!postsFiltered) return { error:`El Post con postID ${id} no existe.` };
    else{
        return postsFiltered;
    }
};

const modifyPost = (id, title, contents) => {
    const findPost = posteos.find(post => post.id == id);

    if (!findPost) return 'No se encontró el Post a Modificar';
    else{
        findPost.title = title ? title : findPost.title;
        findPost.contents = contents ? contents : findPost.contents;
        return findPost;
    }
};

const deletePost = (id) => {
    const postToDelete = posteos.find(post => post.id === Number(id));

    if(!postToDelete) return `El post con ID ${id} no existe.`;
    else{
        posteos = posteos.filter(post => post.id !== Number(id));
        return `${postToDelete.title} eliminado exitosamente`;
    }

    // OTRA FORMA MÁS COMPLICADA PERO FUNCIONA:
    // const indxPost = posteos.findIndex(post => post.id == id);
    
    // if(indxPost < 0 ) return `El Post con id "${id}" no existe`;
    // else{
    //     const delPost = posteos[indxPost];
    //     const userPost = users.find(user => user.posts.includes(delPost));
    //     userPost.posts = userPost.posts.filter(postId => postId !== delPost.id);
        
    //     posteos.splice(indxPost,1);
    //     return `Se ha eliminado correctamente el Post con id "${id}"`;
    // }
};

module.exports = {
    getAllUsers,
    getUsersByName,
    getUsersById,
    postUser,
    updateUser,
    deleteUser,
    postPosteos,
    getAllPosts,
    getPostById,
    modifyPost,
    deletePost
}