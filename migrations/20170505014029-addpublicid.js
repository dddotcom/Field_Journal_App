'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {

        Example: queryInterface.addColumn('journals', 'publicid', Sequelize.STRING);

    },

    down: function(queryInterface, Sequelize) {


        Example: queryInterface.removeColumn('journals', 'publicid', Sequelize.STRING);

    }
};
