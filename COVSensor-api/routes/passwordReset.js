const router = require('express').Router();
const main = require('../../COVSensor-db/index')
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const sendEmail = require('../utils/emailSender');
const crypto = require('crypto')

dotenv.config();

async function setup() {
    console.log(process.env.DB_URI)
    return await main(process.env.DB_URI).catch(handleFatalError);
}

function handleFatalError(err) {
    console.error(`[fatal error] ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

router.route('/').post(async (req,res) => {
    let dao = await setup()
    let body = req.body
    let foundUser = await dao.storeUser.checkIfExists(body)
    if (foundUser) {
        let newPsw = crypto.randomBytes(8).toString("hex")
        console.log(newPsw)
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        foundUser.psw = await bcrypt.hash(newPsw, salt);

        await dao.storeUser.updateUser(foundUser)
            .then(async () => console.log(await bcrypt.compare(newPsw, foundUser.psw)))
            .catch(err => res.status(400).json('Error: ' + err))

        await sendEmail(foundUser.eMail, "Password reset", `New password: ${newPsw}`);
        res.status(200).json("Send succesfully")
    }
    else {
        res.status(404).json("User with given email doesn't exist.")
    }
})

module.exports = router
