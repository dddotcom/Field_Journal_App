'use strict';
module.exports = function(sequelize, DataTypes) {
    var group = sequelize.define('group', {
        groupname: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                models.group.hasMany(models.user);
            }
        }
    });
    return group;
};
