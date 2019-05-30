const express = require('express');
const router = new express.Router();

router.get('/api/example', (req, res) => {
    res.send({example: "example state item"});
});



module.exports = router;