'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,         
        type:Sequelize.INTEGER
      },
        agencyId: { 
          primaryKey: true,
          allowNull: true,
          type: Sequelize.INTEGER,
          // REFERENCIA PARA A AGENCY DB
          refereces: {
            model: "Agencies",
            key: "id",
            as: "agencyId"
          }
          },
          clientId:{
            primaryKey: true,
            allowNull: true,
            type: Sequelize.INTEGER,
            refereces : {
              model: "Clients",
              key: "id",
              as: "clientId"
            }
          },
          accountopening:{
            allowNull: false,
            type: Sequelize.DATE
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
      });    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accounts');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
