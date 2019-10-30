module.exports=function(sequelize,DataTypes){
    var History=sequelize.define("History",{
        dish:{
            type:DataTypes.STRING
        },
        ingredients:{
            type:DataTypes.TEXT
        },
        cuisine:{
            type:DataTypes.STRING
        }
    });
    History.associate=function(models){
        History.belongsTo(models.Chef,{
            foreignKey:{
                allowNull:false
            }
        });
    };

    return History;
};