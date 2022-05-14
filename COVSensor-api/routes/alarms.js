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

// HU21 - Add Alarms 
router.route('/add').post(async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundAlarms = await dao.storeAlarm.checkIfExistsAlarms(body)
    if (foundAlarms == null) { //If user does not exist, we can create one
        dao.storeAlarm.add(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json('Error: ' + err))
    } else { //If alarm already exists, throw error
        res.status(400).json('Error: Alarm already exists.')
    }
})

//-HU 22 - Get Alarms
router.route('/').get(async (req, res) => {
    let dao = await setup()
    await dao.storeAlarm.listAllAlarms()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err))
})

//-HU 23 - Get Detail Alarms by Id
router.get('/:id', async (req, res) => {
    let dao = await setup()
    const parametro = req.params.id;
    await dao.storeAlarm.getAlarmsById(parametro)
        .then(alarms => res.json(alarms))
        .catch(err => res.status(400).json('Error: ' + err))
});

//-HU 24, HU 31 - Update Alarms and Turn Off Alarm
router.put("/update", async (req, res) => {
    let dao = await setup()
    let body = req.body;
    let foundAlarms = await dao.storeAlarm.getAlarmsByUsername(body)
    if (foundAlarms) {
        body.id_Arduino = foundAlarms.id_Arduino
        await dao.storeAlarm.updateAlarms(body)
            .then(() => res.json("Updated Alarm."))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(401).json({
            error: "Alarm does not exist"
        });
    }
});

//-Extra - Delete Alarms
router.delete("/:username", async (req, res) => {
    let dao = await setup()
    const parametro = req.params.username
    try{
        let paraalarm = await dao.storeAlarm.deleteAlarmsByUsername(parametro)
        if(paraalarm) {
            res.json({
                estado: true,
                mensaje:'Alarm delete'
            })
        }else{
            res.json({
                estado: false,
                mensaje:'Fail delete alarms!'
            })
        }
    }catch (error) {
        var err = new Error("Some error ocurred");
        res.status(400).json('Error: ' + err)
    }
});

module.exports = router;