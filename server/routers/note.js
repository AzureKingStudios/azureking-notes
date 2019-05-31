const express = require('express');
const Note = require('../models/note');
const auth = require('../middleware/auth');
const router = new express.Router();

//create a new note
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

//retrieves a single note
router.get('/api/notes/:id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            res.status(400).send();
        }
        res.status(200).send(note);
    } catch(e) {
        res.status(400).send();
    }
});

module.exports = router;