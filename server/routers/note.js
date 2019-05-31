const express = require('express');
const Note = require('../models/note');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/api/notes', auth, async (req, res) => {
   let note = new Note({
       ...req.body,
       owner:req.user._id
   });

   try {
        note.save();
        res.status(201).send(note);
   } catch(e) {
       res.status(400).send();
   }
});

router.get('/api/notes', (req, res) => {
    res.status(200).send({Note: 'first test note'});
});

module.exports = router;