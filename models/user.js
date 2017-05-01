'use strict';
module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        familyId: DataTypes.INTEGER,
        isAdmin: DataTypes.BOOLEAN,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                models.user.hasMany(models.journal);
            }
        }
    });
    return user;
};
