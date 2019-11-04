module.exports=function(sequelize,DataTypes){
    var OnlineChef=sequelize.define("OnlineChef",{

    });
    OnlineChef.associate=function(models){
        OnlineChef.belongsTo(models.Chef,{
            foreignKey:{
                allowNull:false
            }
        });
    };

    return OnlineChef;
};