const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('../routers/cohortsRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
    res.send("It's working!");
});

server.use('/api/cohorts', cohortsRouter);

module.exports = server;