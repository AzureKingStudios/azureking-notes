import React, {Component} from 'react';
import {deleteNote, handleSave} from '../utils/noteUtils';
import Dropdown from './Dropdown';

class ModalButtons extends Component {

    render() {
        const noteValue = {
            title: this.props.titleValue,
            body: this.props.bodyValue,
            color: 'blue'
        }
        return(
    <div className='modal-btn-container'>
        {Object.keys(this.props.currentNote).length >= 1 && 
            <button className='delete-btn' onClick={() => deleteNote(this.props)}>Delete</button>
        }
        <Dropdown/>
        <button className='modal-btn' onClick={() => handleSave(noteValue, this.props)}>Save</button>
        <button className='modal-btn' onClick={this.props.modalSwitch}>Cancel</button>
    </div>
        )
    }
}

export default ModalButtons;