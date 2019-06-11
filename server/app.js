require('./db/mongoose');
const express = require('express');
const exampleRouter = require('./routers/example');
const userRouter = require('./routers/user');
const noteRouter = require('./routers/note');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.json());
app.use(userRouter);
app.use(noteRouter);
app.use(exampleRouter);
app.get('*', (req, res) => {
    // const index = path.join(__dirname, 'build', 'index.html');
    // res.sendFile(index);
    if(process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname+'../client/build/index.html'));
    } else {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    }
});

module.exports = app;