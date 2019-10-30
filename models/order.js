module.exports = function (sequelize, DataTypes) {

    var Order = sequelize.define("Order", {
        orderedQuantity: {
            type: DataTypes.INTEGER
        },
    });

    Order.associate=function(models){
     Order.belongsTo(models.Chef,{
        foreignKey: {
            allowNull: false
        }
     });
     Order.belongsTo(models.Customer,{
        foreignKey: {
            allowNull: false
        }
     });
    };
    return Order;
};