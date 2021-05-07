module.exports = (sequelize, Sequelize) =>{
    const Client = sequelize.define("Client", {
        name: Sequelize.STRING,
        cpf: Sequelize.INTEGER,
        gender: Sequelize.STRING,
        wage: Sequelize.INTEGER,
        contact: Sequelize.STRING,
    })
    return Client;
}