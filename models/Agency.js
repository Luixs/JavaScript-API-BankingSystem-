module.exports = (sequelize, Sequelize) =>{
    const Agency = sequelize.define("Agency", {
        number: Sequelize.INTEGER,
        description: Sequelize.STRING
    });
    //1 - M
    Agency.associate = (models) =>{
        Agency.belongsTo(models.Bank, {
            foreingKey: 'bankId',
            as: "bank"
        }),
        Agency.belongsToMany(models.Client, {
            through: "clientagency"
        })
    }
    //N - M
    /*Agency.associate = (models) =>{
        Agency.belongsToMany(models.Client, {
            through: "clientagency"
        })
    }*/

    return Agency;
}