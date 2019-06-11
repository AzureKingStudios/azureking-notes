require('./server/db/mongoose');
const express = require('express');
const exampleRouter = require('./server/routers/example');
const userRouter = require('./server/routers/user');
const noteRouter = require('./server/routers/note');
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
    // if(process.env.NODE_ENV === 'production') {
    //     res.sendFile(path.join('/app/client/build/index.html'));
        
    //     console.log('production server called', __dirname);
    // } else {
    // }
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;