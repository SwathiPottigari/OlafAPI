module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        comments: {
            type: DataTypes.TEXT
        }
    });
    Review.associate = function (models) {
        Review.belongsTo(models.Chef, {
            foreignKey: {
                allowNull: false
            }
        });
        Review.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Review;
};