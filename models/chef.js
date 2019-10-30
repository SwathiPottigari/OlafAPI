module.exports = function (sequelize, DataTypes) {

    var Chef = sequelize.define("Chef", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        specialities: {
            type: DataTypes.TEXT
        },
        contact: {
            type: DataTypes.STRING
        },
        kitchenName: {
            type: DataTypes.STRING
        },
        license: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.TEXT
        }
    });

    Chef.associate=function(models){
       Chef.belongsTo(models.User,{
        foreignKey: {
            allowNull: false
        }
       })

    };

    return Chef;
};