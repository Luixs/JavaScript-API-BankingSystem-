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
        Agency.hasMany(models.Account, {
            foreignKey: "agencyId",
            as: "agency"
        })
    }
    return Agency;
}