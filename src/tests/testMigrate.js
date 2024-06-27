require('../models')
const sequelize = require('../utils/connection');
const user = require('./createData/user');

const testMigrate = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("DB RESET 🤗👌🏻");
        await user()
    } catch (error) {
        console.log(error)
    }
}

testMigrate();
