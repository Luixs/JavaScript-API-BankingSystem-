module.exports = (sequelize, Sequelize) =>{
    const Bank = sequelize.define("Bank", {
        cpnj: Sequelize.INTEGER,
        companyName: Sequelize.STRING,
        contact: Sequelize.STRING,
    })

    Bank.associate = (models) =>{
        Bank.hasMany(models.Agency, {
            foreingKey: 'bankId',
            as: "bank"
        })
    }
    return Bank;
}