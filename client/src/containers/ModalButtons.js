import React, {Component} from 'react';

class ModalButtons extends Component {

    render() {
    <div className='modal-btn-container'>
        {Object.keys(this.props.currentNote).length >= 1 && 
            <button className='delete-btn' onClick={()=>deleteNote(this.props)}>Delete</button>
        }
        <button className='modal-btn' onClick={this.handleSave}>Save</button>
        <button className='modal-btn' onClick={this.props.modalSwitch}>Cancel</button>
    </div>
    }
}

export default ModalButtons;