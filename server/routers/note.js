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

//retrieve all notes
router.get('/api/notes', auth, async (req, res)=>{
    try {
        const notes = await Note.find({owner: req.user._id})
        res.status(200).send(notes);
    } catch(e) {
        res.status(400).send();
    }
});

//update a note
router.patch('/api/notes/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['body', 'title', 'color'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        res.status(400).send({error: "invalid updates"});
    }
   
    try{
        const note = await Note.findById(req.params.id);
        updates.forEach(update => note[update] = req.body[update]);
        await note.save();
        res.status(200).send(note);
   } catch(e) {
       res.status(400).send();
   }
});

//delete a note
router.delete('/api/notes/:id', auth, async (req, res) => {
    try{
        const note = await Note.findOne({_id: req.params.id});
        if(!note) {
            res.status(400).send();
        }
        note.remove();
        res.status(200).send(note);
    } catch(e){
        res.status(400).send();
    }
});

module.exports = router;
