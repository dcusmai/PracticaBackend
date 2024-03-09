const { DataTypes } = require('sequelize');

module.exports = (database) => {
    database.define('User', { // a database (instancia de Sequelize), también se lo suele llamar por defecto "sequelize"
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }); 
}

