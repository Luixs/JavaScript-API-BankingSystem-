module.exports = (sequelize, Sequelize) =>{
    const Client = sequelize.define("Client", {
        name: Sequelize.STRING,
        cpf: Sequelize.INTEGER,
        gender: Sequelize.STRING,
        wage: Sequelize.INTEGER,
        contact: Sequelize.STRING,
    })

    //N - M
    Client.associate = (models) =>{
        Client.hasMany(models.Account, {
            foreingKey: "clientId",
            as: "client"
        })
    }
    return Client;
}

