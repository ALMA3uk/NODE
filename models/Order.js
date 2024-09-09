const { DataTypes } = require('sequelize');

const Order = (sequelize) => {
    const OrderModel = sequelize.define('Order', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    });

    OrderModel.associate = (models) => {
        OrderModel.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return OrderModel;
};

module.exports = Order;
