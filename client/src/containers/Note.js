import React, {Component} from 'react';

class Note extends Component {
    render() {
        const note = this.props.note;
        return(
            <div className='single-note'>
                <h2>{note.title}</h2>
                <p>{note.body}</p>
            </div>
        )
    }
}

export default Note;