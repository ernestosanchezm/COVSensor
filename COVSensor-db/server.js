const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

require("dotenv").config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
console.log(uri)
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
    // perform a database connection when backend starts
    console.log(`Server is running on port: ${port}`);
});