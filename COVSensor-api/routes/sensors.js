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

router.route("/").get(async (req, res) => {
    let dao = await setup()
    await dao.storeSensor.listAllSensors()
        .then(sensors => res.json(sensors))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route("/:id").get(async (req, res) => {
    let dao = await setup()
    const id = req.params.id
    await dao.storeSensor.getById(id)
        .then(sensor => res.json(sensor))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundSensor = await dao.storeSensor.checkIfExists(body)
    if (foundSensor == null) {
        dao.storeSensor.add(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(400).json('Error: Sensor already exists.')
    }
})


router.route("/update").put(async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundSensor = await dao.storeSensor.getById(body)
    if(foundSensor) {
        body._id = foundSensor._id
        await dao.storeSensor.updateSensor(body)
            .then(() => res.json("Updated sensor."))
            .catch(err => res.status(400).json('Error: ' +err))
    } else {
        res.status(401).json({
            error: "Sensor does not exist"
        });
    }
});



module.exports = router;