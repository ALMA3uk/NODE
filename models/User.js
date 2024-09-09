const { DataTypes } = require('sequelize');

const User = (sequelize) => {
    const UserModel = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        }
    }, {
        timestamps: false
    });

    UserModel.associate = (models) => {
        UserModel.hasMany(models.Order, { foreignKey: 'userId' });
    };

    return UserModel;
};

module.exports = User;
