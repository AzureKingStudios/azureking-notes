const express = require('express');
const router = new express.Router();

router.get('/api/example', (req, res) => {
    res.send({example: "example state item"});
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = router;