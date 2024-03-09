const DataTypes = require('sequelize');

module.exports = (database) => {
    database.define('Posteo', {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
}