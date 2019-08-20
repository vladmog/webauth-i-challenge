const express = require('express');

const ApiRouter = require('./api-router.js');

const server = express();

server.use(express.json());

server.use('/api', ApiRouter)

module.exports = server 