'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agencies', { 
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,         
        type: Sequelize.INTEGER
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // ------- FOREIGN KEY ----------
      idBank: {
        allowNull: false,
        type: Sequelize.INTEGER,
        refereces: {
          model: 'Banks',
          key: 'id',
          as: 'idBank'
        },
        createdAt:{
          allowNull: false,
          type: Sequelize.DATE          
        },
        updatedAt:{
          allowNull: false,
          type: Sequelize.DATE
        }    
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
    await queryInterface.dropTable('agencies');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
