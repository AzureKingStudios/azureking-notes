import React, {Component} from 'react';

class Note extends Component {
    render() {
        const note = this.props.note;
        return(
            <li onClick={()=>{this.props.setCurrentNote(note)}} className='single-note'>
                <p className='note-title'>{note.title}</p>
                <p className='note-body'>{note.body}</p>
            </li>
        )
    }
}

export default Note;