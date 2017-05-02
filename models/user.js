'use strict';
module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
        groupId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                models.user.hasMany(models.journal)
                models.user.belongsTo(models.group)
            }
        }
    });
    return user;
};
