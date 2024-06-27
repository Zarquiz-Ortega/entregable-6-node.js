const User = require("../../models/User")

const user = async () => {
    const body = {
        firstName: "User",
        lastName: "prueba",
        email: "user@email.com",
        password: "user123",
        phone: "5500000000"
    }

    await User.create(body)
}

module.exports = user