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
            model: "Agency",
            key: "id",
            as: "AgencyId"
          }
          },
          clientId:{
            primaryKey: true,
            allowNull: true,
            type: Sequelize.INTEGER,
            // CREATE A REFERENCE
            refereces : {
              model: "Bank",
              key: "id",
              as: "ClientId"
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
