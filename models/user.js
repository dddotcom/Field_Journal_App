'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'username must be between 1 and 99 characters'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'password must be between 1 and 99 characters'
                }
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN
        },
        groupId: {
            type: DataTypes.INTEGER
        }

    }, {
        hooks: {
            beforeCreate: function(createUser, options, cb) {
                if (createUser && createUser.password) {
                    var hash = bcrypt.hashSync(createUser.password, 10);
                    createUser.password = hash;
                }
                cb(null, createUser);
            }
        },
        classMethods: {
            associate: function(models) {
                models.user.hasMany(models.journal)
                models.user.belongsTo(models.group)
            }
        },
        instanceMethods: {
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
            toJSON: function() {
                var jsonUser = this.get();
                delete jsonUser.password;
                return jsonUser;
            }
        }
    });
    return user;
};
