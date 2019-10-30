let bcrypt=require("bcrypt");

module.exports=function(sequelize,DataTypes){

    var User=sequelize.define("User",{
        password: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[8]
            }
        }
    });

    
    User.associate = function(models) {
        User.hasMany(models.Chef);
        User.hasMany(models.Customer);
      };

      User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });

      return User;
};