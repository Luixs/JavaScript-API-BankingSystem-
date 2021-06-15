
module.exports = ( sequelize, Sequelize)=>{
    const User = sequelize.define("User", {
        name: Sequelize.STRING,
        user: Sequelize.STRING,
        password: Sequelize.STRING
    })
    return User;
}