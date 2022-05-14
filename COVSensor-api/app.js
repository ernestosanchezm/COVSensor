const setup = require('../COVSensor-db/index')

const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');
const closedspaceRouter = require('./routes/closedspace');
const alarmsRouter = require('./routes/alarms');
const metricspaceRouter = require('./routes/metricSpace');
const airbombRouter = require('./routes/airBombs');
const passwordRecoveryRouter = require('./routes/passwordReset');
const airBombRouter = require('./routes/airBombs');
const sensorRouter = require ('./routes/sensors');


app.use('/users', usersRouter);
app.use('/closedspace', closedspaceRouter);
app.use('/alarms', alarmsRouter);
app.use('/concentration', metricspaceRouter);
app.use('/airbomb', airbombRouter);
app.use('/password-recovery', passwordRecoveryRouter);

app.use('/sensors', sensorRouter);

app.use('/air-bombs', airBombRouter);

app.use('/sensors', sensorRouter);

app.listen(port, () => {
    // perform a database connection when backend starts
    console.log(`Server is running on port: ${port}`);
});