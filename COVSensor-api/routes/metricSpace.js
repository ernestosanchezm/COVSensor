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

// HU22 - Get all level Concentration CO2
router.get('/all', async (req, res) => {
    let dao = await setup()
    await dao.storeMetricSpace.listAllMetricSpace()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err))
});

// HU23, HU24, HU25 HU26- level concentration by day, week, month
router.get('/:datetype', async (req, res) => {
    let dao = await setup()
    const parametro = req.params.datetype;
    if (parametro === "dia") {
        await dao.storeMetricSpace.listDayMetricSpace()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err))
    } else if (parametro === "mes") {
        await dao.storeMetricSpace.listMonthMetricSpace()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err))
    } else if (parametro === "semana") {
        await dao.storeMetricSpace.listWeekMetricSpace()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err))
    }
});

module.exports = router;




