'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Banks', { 
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,         
        type:Sequelize.INTEGER
      },
      cpnj:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      companyName: {
        allowNull:false,
        type: Sequelize.STRING
      },
      contact :{
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt:{
        allowNull: false,
        type: Sequelize.DATE          
      },
      updatedAt:{
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
    await queryInterface.dropTable('Banks');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
