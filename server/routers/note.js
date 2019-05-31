const express = require('express');
const Note = require('../models/note');
const router = new express.Router();

router.get('/api/notes', (req, res) => {
    res.status(200).send({Note: 'first test note'});
});

module.exports = router;