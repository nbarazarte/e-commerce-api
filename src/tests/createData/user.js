const User = require("../../models/User")

const user = async()=>{

    const userCreate = {
        firstName: "Neel",
        lastName: "Barazarte",
        email: "ezebarazarte@gmail.com",
        password: "123456",
        phone: "04142101096"
    }

    await User.create(userCreate)

}
module.exports = user