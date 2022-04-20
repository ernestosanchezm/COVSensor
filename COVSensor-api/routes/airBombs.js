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

module.exports = router;