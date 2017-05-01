'use strict';
module.exports = function(sequelize, DataTypes) {
    var family = sequelize.define('family', {
        lastName: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                models.family.hasMany(models.user);
            }
        }
    });
    return family;
};
