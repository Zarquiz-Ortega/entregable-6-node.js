require('../models')
const sequelize = require('../utils/connection');

const testMigrate = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("DB RESET 🤗👌🏻");
    } catch (error) {
        console.log(error)
    }
}

testMigrate();
