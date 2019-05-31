const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    }, 
    body: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true,
        default: 'white'
    }
}, {
    timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;