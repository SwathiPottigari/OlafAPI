module.exports=function(sequelize,DataTypes){
    var Menu=sequelize.define("Menu",{
        dish:{
            type:DataTypes.STRING
        },
        quantity:{
            type:DataTypes.INTEGER
        },
        servingUnit:{
            type:DataTypes.STRING
        },
        price:{
            type:DataTypes.FLOAT
        },
        ingredients:{
            type:DataTypes.TEXT
        },
        cuisine:{
            type:DataTypes.STRING
        },
        description:{
            type:DataTypes.STRING
        },
        imageURL:{
            type:DataTypes.STRING
        }
    });

    Menu.associate=function(models){
     Menu.hasMany(models.Order);
     Menu.belongsTo(models.Chef,{
        foreignKey: {
            allowNull: false
        }
     });
    }

    return Menu;
};