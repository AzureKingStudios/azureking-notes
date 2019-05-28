require('./db/mongoose');
const express = require('express');
const exampleRouter = require('./routers/example');
const userRouter = require('./routers/user');
const path = require('path');

const app = express();

app.use(express.json());
app.use(exampleRouter);
app.use(userRouter);
app.use(express.static(path.join(__dirname, 'client/build')));

module.exports = app;