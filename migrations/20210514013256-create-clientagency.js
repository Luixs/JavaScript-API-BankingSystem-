'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ClientAgency', {
      ClientId: {
        primaryKey: true,
        allowNull: true,
        type: Sequelize.INTEGER,
        refereces: {
          model: "clients",
          key: "id",
          as: "ClientId"
        }
      },
      AgencyId: {
        primaryKey: true,
        allowNull: true,
        type: Sequelize.INTEGER,
        refereces: {
          model: "agencies",
          key: "id",
          as: "AgencyId"
        }
      },
      createdAt:{
        allowNull: false,
        type: Sequelize.DATE          
      },
      updatedAt:{
        allowNull: false,
        type: Sequelize.DATE
      } 
      })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
