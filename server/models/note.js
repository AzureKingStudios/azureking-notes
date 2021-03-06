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
    },
    pinned: {
        type: Boolean,
        default: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;