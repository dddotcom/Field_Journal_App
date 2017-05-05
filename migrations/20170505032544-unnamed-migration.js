'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {

        Example: queryInterface.addColumn('journals', 'userId', Sequelize.INTEGER);

    },

    down: function(queryInterface, Sequelize) {


        Example: queryInterface.removeColumn('journals', 'userId', Sequelize.INTEGER);

    }
};
