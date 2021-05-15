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
        Client.belongsToMany(models.Agency, {
            through: "clientagency"
        })
    }
    return Client;
}

