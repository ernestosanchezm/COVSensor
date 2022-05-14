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

// HU27 - Get Status AirBomb by Id
router.get('/:id', async (req, res) => {
    let dao = await setup()
    const parametro = req.params.id;
    await dao.storeAirBomb.getAirBombById(parametro)
        .then(airBomb => res.json({
            status:airBomb.status
        }))
        .catch(err => res.status(400).json('Error: ' + err))
});

// HU28, HU30 - Update Status Airbomb and Schedule Airbomb
router.put("/updatestatus", async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundAirBomb = await dao.storeAirBomb.getAirBombByIdGadget(body)
    if (foundAirBomb) {
        body.id_Arduino = foundAirBomb.id_Arduino
        await dao.storeAirBomb.updateAirBomb(body)
            .then(() => res.json("Updated Status AirBomb."))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(401).json({
            error: "AirBomb does not exist"
        });
    }
});

// HU 29 - Get All Airbomb
router.route('/').get(async (req, res) => {
    let dao = await setup()
    await dao.storeAirBomb.listAllAirBomb()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err))
})



module.exports = router;