require("dotenv").config();
require("./config/db").connect();
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
const router = require('./router/user.router');
app.use('/api/v1', router);

module.exports = app;