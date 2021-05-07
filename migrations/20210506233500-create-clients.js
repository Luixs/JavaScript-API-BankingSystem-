'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
       id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,         
        type: Sequelize.INTEGER
       },
       name:{
         allowNull: false,
         type: Sequelize.STRING,
       },
       cpf: {
         allowNull: false,
         type: Sequelize.INTEGER
       },
       gender: {
         allowNull: false,
         type: Sequelize.STRING
       },
       wage: {
         allowNull: false,
         type: Sequelize.INTEGER
       },
       contact: {
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
      })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clients');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
