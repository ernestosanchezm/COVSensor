const router = require('express').Router();
let User = require('../Schemas/Users');
const bcrypt = require("bcrypt");
let userDAO = require('../lib/Users');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post(async (req, res) => {
    const eMail = req.body.eMail;
    const userName = req.body.userName;
    let psw = req.body.psw;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const isAdmin = req.body.isAdmin;
    const user = await User.findOne({
        eMail: req.body.eMail,
    });
    if (user) {
        res.status(400).json('Error: User already exists')
    } else {
        const salt = await bcrypt.genSalt(10);
        let newUser = new User({
            eMail,
            userName,
            psw,
            name,
            lastName,
            isAdmin
        });
        newUser.psw = await bcrypt.hash(newUser.psw, salt);
        console.log(newUser)
        newUser.save()
            .then(() => res.json('User added.'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    //console.log(body)
    const user = await User.findOne({
        email: body.eMail
    });
    //console.log(user)
    if (user) {
        res.status(400).json({
            error: "User already exists."
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const eMail = req.body.eMail;
        const userName = req.body.userName;
        let psw = req.body.psw;
        const name = req.body.name;
        const lastName = req.body.lastName;

        const newUser = new User({
            eMail,
            userName,
            psw,
            name,
            lastName
        });
        newUser.psw = await bcrypt.hash(newUser.psw, salt);
        console.log(newUser)
        newUser.save()
            .then(() => res.json('User added.'))
            .catch(err => res.status(400).json('Error: ' + err));
        res.status(201).json({
            error: "User does not exist"
        });
    }
});

// login route
router.post("/login", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({
        email: body.email
    });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            res.status(200).json(user);
        } else {
            res.status(400).json({
                error: "Invalid Password"
            });
        }
    } else {
        res.status(401).json({
            error: "User does not exist"
        });
    }
});

// Update admin route
router.put("/update-admin", async (req, res) => {
    const body = req.body;
    const foundAdmin = await User.findOne({
        email: body.email,
        isAdmin: true
    });
    if (foundAdmin) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            res.status(200).json(user);
        } else {
            res.status(400).json({
                error: "Invalid Password"
            });
        }
    } else {
        res.status(401).json({
            error: "Admin does not exist"
        });
    }
});

// Get Supervisors
router.route("/supervisors").get((req, res) => {
    User.find({
            isAdmin: false
        })
        .then(users => {
            console.log(users)
            res.json(users)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;