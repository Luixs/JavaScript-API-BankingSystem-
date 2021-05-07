module.exports = (sequelize, Sequelize) =>{
    const Bank = sequelize.define("Bank", {
        number: Sequelize.INTEGER,
        description: Sequelize.STRING
    })

    Agency.associate = (models) =>{
        Agency.belongsTo(models.Bank, {
            foreingKey: 'poketipoId',
            as: "poketipo"
        })
    }
    return Bank;
}