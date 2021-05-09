
module.exports = (sequelize, Sequelize) =>{
    const Account = sequelize.define("Account", {
        accountopening: Sequelize.DATE        
    },//{timestamps: false}
    
    )
    Account.associate = (models) =>{
        Account.belongsToMany(models.Client,{
            through: "Account_Client"
        });
    }
    Account.associate = (models) =>{
        Account.belongsToMany(models.Agency, {
            through: "Account_Agency"
        });
    }
    return Account;
}