import React, {Component} from 'react';

class NoteModal extends Component {

    handleClick = (event) => {
        console.log(event.target.className);
        if(event.target.className === 'note-modal') {
            this.props.modalSwitch()
        }
    }

    render() {
        return(
            <div className='note-modal' onClick={(event) => this.handleClick(event)}>
                <div className='note-modal-content'>
                    <div contentEditable className='note-input'></div>
                    <div contentEditable className='note-input'></div>
                </div>
                {/* <form className='note-modal-form'>
                    <input className='note-input'></input>
                </form> */}
            </div>
        )
    }
}

export default NoteModal;