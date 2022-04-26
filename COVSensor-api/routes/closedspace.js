const router = require('express').Router();
const main = require('../../COVSensor-db/index')
const dotenv = require('dotenv');

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

// HU9 - Add Closed Space 
router.route('/add').post(async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundCloseSpace = await dao.storeClosedSpace.checkIfExistsClosedSpace(body)
    if (foundCloseSpace == null) { //If user does not exist, we can create one
        dao.storeClosedSpace.add(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json('Error: ' + err))
    } else { //If user already exists, throw error
        res.status(400).json('Error: User already exists.')
    }
})

//-HU 10 - Get ClosedSpace

router.route('/').get(async (req, res) => {
    let dao = await setup()
    await dao.storeClosedSpace.listAllClosedSpace()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err))
})

//-HU 11 - Get Detail ClosedSpace by Id
router.get('/:id', async (req, res) => {
    let dao = await setup()
    const parametro = req.params.id;
    await dao.storeClosedSpace.getClosedSpaceById(parametro)
        .then(closedSpace => res.json(closedSpace))
        .catch(err => res.status(400).json('Error: ' + err))
});

//-HU 12 - Update ClosedSpace
router.put("/update", async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundCloseSpace = await dao.storeClosedSpace.getClosedSpaceByUsername(body)
    if (foundCloseSpace) {
        body.id_Arduino = foundCloseSpace.id_Arduino
        await dao.storeClosedSpace.updateClosedSpace(body)
            .then(() => res.json("Updated Closed Space."))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(401).json({
            error: "Closed Space does not exist"
        });
    }
});

module.exports = router;