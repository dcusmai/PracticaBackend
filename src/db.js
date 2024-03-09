require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel = require('./models/UserModel');

const { 
    DB_USER, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_NAME 
} = process.env;

//console.log(process.env);

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`); //`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

UserModel(database);

module.exports = { database };

//`postgres://postgres:28584841@MMA@localhost:5432/demosequelize2`