import React, {Component} from 'react';

class Note extends Component {

    getNoteColor = (noteColor) => {
        let color ='';

        switch(noteColor) {
            case 'red':
                color = '#F5535E';
                break;
            case 'blue':
                color = '#61dafb';
                break;
            case 'yellow':
                color = '#ffd000';
                break;
            default: 
                color = 'white';
        }

        return color;
    }

    render() {
        const note = this.props.note;
        let noteColor = this.getNoteColor(note.color);
        return(
            <li style={{backgroundColor: noteColor}} onClick={()=>{this.props.setCurrentNote(note)}} className='single-note'>
                <p className='note-title'>{note.title}</p>
                <p className='note-body'>{note.body}</p>
            </li>
        )
    }
}

export default Note;