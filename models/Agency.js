module.exports = (sequelize, Sequelize) =>{
    const Agency = sequelize.define("Agency", {
        number: Sequelize.INTEGER,
        description: Sequelize.STRING
    },//{timestamps: false}
    
    )
    Agency.associate = (models) =>{
        Agency.belongsTo(models.Bank, {
            foreingKey: 'bankId',
            as: "bank"
        })
    }
    return Agency;
}