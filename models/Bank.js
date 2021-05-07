module.exports = (sequelize, Sequelize) =>{
    const Bank = sequelize.define("Bank", {
        number: Sequelize.INTEGER,
        description: Sequelize.STRING
    })

    Bank.associate = (models) =>{
        Bank.hasMany(models.Agency, {
            foreingKey: 'idBank',
            as: "bank"
        })
    }
    return Bank;
}