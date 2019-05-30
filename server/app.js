require('./db/mongoose');
const express = require('express');
const exampleRouter = require('./routers/example');
const userRouter = require('./routers/user');
const path = require('path');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(exampleRouter);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.use(express.static(path.join(__dirname, 'client/build')));

module.exports = app;