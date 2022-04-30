const router = require('express').Router();
const main = require('../../COVSensor-db/index');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { remove } = require('../../COVSensor-db/Schemas/AirBombs');

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

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, {
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
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        psw = await bcrypt.hash(body.psw, salt);
        body.psw = psw
        dao.storeUser.add(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json('Error: ' + err))
    } else { //If user already exists, throw error
        res.status(400).json('Error: User already exists.')

    }
})

//login route ready
router.post("/login", async (req, res) => {
    let dao = await setup()
    const body = req.body;
    const foundEmail = await dao.storeUser.getByEmail(body)
    if (foundEmail) { //If user already exist, we can create one
        const validPassword = await bcrypt.compare(body.psw, foundEmail.psw);
        if (validPassword) { //If the password is valid, then return JWT
            const token = generateAccessToken({
                email: req.body.eMail
            });
            res.status(200).json({
                token,
                message: "Valid password."
            })
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
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
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

// Get Admin
router.route("/admin").get(async (req, res) => {
    let dao = await setup()
    await dao.storeUser.listAdmin()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Add Supervisor 
router.route('/supervisors/add').post(async (req, res) => {
    let dao = await setup()
    let body = req.body
    let foundUser = await dao.storeUser.checkIfExists(body)
    console.log(foundUser)
    if (foundUser) {
        res.status(400).json('Error: Supervisor already exists.')
    } else {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        body.psw = await bcrypt.hash(body.psw, salt);
        body.isAdmin = false
        dao.storeUser.add(body)
            .then(() => res.status(201).json("Created Supervisor."))
            .catch(err => res.status(400).json('Error: ' + err))
    }
})

// HU7 - Update supervisor
router.put("/supervisors/update", async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundAdmin = await dao.storeUser.getSupervisorByUsername(body)
    if (foundAdmin) {
        body._id = foundAdmin._id
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        psw = await bcrypt.hash(body.psw, salt);
        body.psw = psw
        await dao.storeUser.updateSupervisor(body)
            .then(() => res.json("Updated supervisor."))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(401).json({
            error: "Supervisor does not exist"
        });
    }
});

//-HU 8 - Delete supervisor
router.delete("/supervisors/:username", async (req, res) => {
    let dao = await setup()
    const parametro = req.params.username
    try{
        let parausername = await dao.storeUser.deleteSupervisorByUsername(parametro)
        if(parausername) {
            res.json({
                estado: true,
                mensaje:'Supervisor eliminado'
            })
        }else{
            res.json({
                estado: false,
                mensaje:'fallo eliminar supervisor!'
            })
        }
    }catch (error) {
        res.status(400).json('Error: ' + err)
    }
});

// Extra - Get user by username
router.get('/:username', async (req, res) => {
    let dao = await setup()
    const parametro = req.params.username;
    await dao.storeUser.getUserByUsername(parametro)
        .then(users => res.json({
            userName:users.userName,
            name:users.name,
            lastName:users.lastName,
            eMail:users.eMail,
            isAdmin:users.isAdmin
        }))
        .catch(err => res.status(400).json('Error: ' + err))
});

//Update Password
router.post('/email', async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundEmail = await dao.storeUser.chekIfEmailExists(body)
    if(foundEmail){
        res.status(200).json({
            message: "Valid Email"
        });
    } else {
        res.status(400).json({
            error: "Invalid Email."
        });
    }
})

router.put("/password/update", async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundEmail = await dao.storeUser.chekIfEmailExists(body)
    if (foundEmail) {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        psw = await bcrypt.hash(body.psw, salt);
        body.psw = psw
        await dao.storeUser.updatePasswordr(body)
            .then(() => res.json("Updated password."))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(401).json({
            error: "Updated not password"
        });
    }
});


module.exports = router;