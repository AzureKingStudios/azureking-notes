import React, {Component} from 'react';

class NoteModal extends Component {

    render() {
        return(
            <div className='note-modal' onClick={this.props.modalSwitch}></div>
        )
    }
}

export default NoteModal;