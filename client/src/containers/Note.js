import React, {Component} from 'react';
import {getNoteColor} from '../utils/noteUtils';

class Note extends Component {

    render() {
        const note = this.props.note;
        let noteColor = getNoteColor(note.color);
        return(
            <li style={{backgroundColor: noteColor}} onClick={()=>{this.props.setCurrentNote(note)}} className='single-note'>
                <p className='note-title'>{note.title}</p>
                <p className='note-body'>{note.body}</p>
            </li>
        )
    }
}

export default Note;