module.exports=function(sequelize,DataTypes){
    var Customer=sequelize.define("Customer",{
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
        contact: {
            type: DataTypes.STRING
        }
    });

    Customer.associate=function(models){
        Customer.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            }
        });
        Customer.hasMany(models.Order);        
        Customer.hasMany(models.Review);        
    };

    return Customer;
};