const router = require('express').Router();
const main = require('../../COVSensor-db/index')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

async function setup() {
    console.log(process.env.ATLAS_URI)
    return await main(process.env.ATLAS_URI).catch(handleFatalError);
}

function handleFatalError(err) {
    console.error(`[fatal error] ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, {
        expiresIn: '1800s'
    });
}

router.route('/').get(async (req, res) => {
    let dao = await setup()
    await dao.storeUser.listAllUsers()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

// add any user
router.route('/add').post(async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundUser = await dao.storeUser.checkIfExists(body)
    if (foundUser == null) { //If user does not exist, we can create one
        const salt = await bcrypt.genSalt(10);
        psw = await bcrypt.hash(body.psw, salt);
        body.psw = psw
        dao.storeUser.add(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json('Error: ' + err))
    } else { //If user already exists, throw error
        res.status(400).json('Error: User already exists.')

    }
})

// login route ready
router.post("/login", async (req, res) => {
    let dao = await setup()
    const body = req.body;
    const foundUser = await dao.storeUser.checkIfExists(body)
    if (foundUser == true) { //If user already exist, we can create one
        const user = await dao.storeUser.getByUsernameAndPsw(body)
        const validPassword = await bcrypt.compare(body.psw, user[0].psw);
        
        if (validPassword) { //If the password is valid, then return JWT
            const token = generateAccessToken({
                username: req.body.userName
            });
            res.status(200).json(token)
        } else {
            res.status(400).json({
                error: "Invalid Password."
            });
        }
    } else {
        res.status(401).json({ //If user does not exist, the credentials are invalid
            error: "No user exists with those credentials."
        });
    }
});

// Update admin route ready
router.put("/admin/update", async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundAdmin = await dao.storeUser.getAdminByUsername(body)
    if (foundAdmin) {
        body._id = foundAdmin._id
        const salt = await bcrypt.genSalt(10);
        psw = await bcrypt.hash(body.psw, salt);
        body.psw = psw
        await dao.storeUser.updateUser(body)
            .then(() => res.json("Updated admin."))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(401).json({
            error: "Admin does not exist"
        });
    }
});

// Get Supervisors
router.route("/supervisors").get(async (req, res) => {
    let dao = await setup()
    await dao.storeUser.listSupervisors()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Add Supervisor 
router.route('/supervisors/add').post(async (req, res) => {
    let dao = await setup()
    let body = req.body
    let foundUser = await dao.storeUser.checkIfExists({
        body
    })
    if (foundUser) {
        res.status(400).json('Error: Supervisor already exists.')
    } else {
        const salt = await bcrypt.genSalt(10);
        body.psw = await bcrypt.hash(body.psw, salt);
        body.isAdmin = false
        console.log("body", body)
        dao.storeUser.add({
                body
            })
            .then(user => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err))
    }
})

module.exports = router;