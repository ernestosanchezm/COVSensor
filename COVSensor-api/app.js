const setup = require('../COVSensor-db/index')

const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
    // perform a database connection when backend starts
    console.log(`Server is running on port: ${port}`);
});