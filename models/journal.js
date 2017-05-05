'use strict';
module.exports = function(sequelize, DataTypes) {
    var journal = sequelize.define('journal', {
        userId: DataTypes.INTEGER,
        plantName: DataTypes.STRING,
        description: DataTypes.STRING,
        imageURL: DataTypes.STRING,
        publicid: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                models.journal.belongsTo(models.user);
            }
        }
    });
    return journal;
};
