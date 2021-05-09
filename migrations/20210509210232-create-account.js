'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Acounts', {
       AgencyId: { 
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
        ClientId:{
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
        OpenDate:{
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
    await queryInterface.dropTable('Acounts');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
