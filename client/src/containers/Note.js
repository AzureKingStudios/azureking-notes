import React, {Component} from 'react';

class Note extends Component {
    render() {
        const note = this.props.note;
        return(
            <div className='single-note'>
                <p className='note-title'>{note.title}</p>
                <p className='note-body'>{note.body}</p>
            </div>
        )
    }
}

export default Note;