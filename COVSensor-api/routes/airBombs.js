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
    await dao.storeAirBomb.listAllAirBombs()
        .then(airBombs => res.json(airBombs))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route("/:id").get(async (req, res) => {
    let dao = await setup()
    const id = req.params.id
    await dao.storeAirBomb.getById(id)
        .then(sensor => res.json(sensor))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route("/arduino/:id_arduino").get(async (req, res) => {
    let dao = await setup()
    const id_ard = req.params.id_arduino
    await dao.storeAirBomb.getByIdArduino(id_ard)
        .then(sensor => res.json(sensor))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundAirBomb = await dao.storeAirBomb.checkIfExists(body)
    if (foundAirBomb == null) {
        dao.storeAirBomb.add(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(400).json('Error: AirBomb already exists.')
    }
})

router.route("/update").put(async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundAirBomb = await dao.storeAirBomb.getById(body)
    if(foundAirBomb) {
        body._id = foundAirBomb._id
        await dao.storeAirBomb.updateAirBomb(body)
            .then(() => res.json("Updated airBomb."))
            .catch(err => res.status(400).json('Error: ' +err))
    } else {
        res.status(401).json({
            error: "AirBomb does not exist"
        });
    }
});


router.route("/:id").delete(async (req, res) => {
    let dao = await setup()
    const id = req.params.id
    try {
        let airBomb = await dao.storeAirBomb.deleteAirBombById(id)
        if(airBomb) {
            res.json({
                estado: true,
                mensaje: 'Sensor deleted'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'Fail deleting Air Bomb'
            })
        }
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
})
module.exports = router;