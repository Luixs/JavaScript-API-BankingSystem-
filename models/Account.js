
module.exports = (sequelize, Sequelize) =>{
    const Account = sequelize.define("Account", {
        accountopening: Sequelize.DATE        
    })
    
    Account.associate = (models) =>{
        Account.belongsTo(models.Client, {
            foreingKey: "clientId",
            as: "client"
        },
        Account.belongsTo(models.Agency, {
            foreignKey: "agencyId",
            as: "agency"
        }))
    }
    return Account;
}