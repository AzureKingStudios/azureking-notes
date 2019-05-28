const express = require('express');
const exampleRouter = require('./routers/example');
const path = require('path');

const app = express();

app.use(express.json());
app.use(exampleRouter);
app.use(express.static(path.join(__dirname, 'client/build')));

module.exports = app;