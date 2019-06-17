import React, {Component} from 'react';
import {addNote, updateNote} from '../utils/noteUtils';
import ModalButtons from './ModalButtons';

class NoteModal extends Component {

    state = {
        titleValue: '',
        bodyValue: '',
        note: {}
    }

    handleChangeTitle = (event) => {
        console.log(event.target.value);
        this.setState({titleValue: event.target.value});
    }
    
    handleChangeBody = (event) => {
        this.setState({bodyValue: event.target.value});
    }
    
    handleClick = (event) => {
        console.log(event.target.className);
        if(event.target.className === 'note-modal') {
            this.props.modalSwitch();
        }
    }

    handleSave = () => {
        const note = {
            //ternary prevents trim from being called on an undefined value
            title: this.state.titleValue === undefined ? '' : this.state.titleValue.trim(),
            body: this.state.bodyValue === undefined ? '' : this.state.bodyValue.trim()
        }

        const noteIsSame = (note.title === this.props.currentNote.title 
                                && note.body === this.props.currentNote.body);

        const noteIsEmpty = (note.title === '' && note.body === '')
        
        //prevents empty note or a note that hasnt changed from being saved
        if( noteIsEmpty || noteIsSame){
            this.props.modalSwitch();
            return;
        }
        
        if(Object.keys(this.props.currentNote).length >= 1){
            console.log('new note being updated')
            updateNote(note, this.props);
            return;
        }

        addNote(note,this.props);
    }
    
    componentDidMount() {
        this.setState({
            titleValue:this.props.currentNote.title,
            bodyValue: this.props.currentNote.body
        });
    }

    render() {
        return(
            <div className='note-modal' onClick={(event) => this.handleClick(event)}>
                <div className='note-modal-content'>
                    <textarea
                    maxLength='2000' 
                    className='note-input-title'
                    value={this.state.titleValue}
                    onChange={this.handleChangeTitle}></textarea>
                    <textarea 
                    maxLength='2000' 
                    className='note-input-body'
                    value={this.state.bodyValue}
                    onChange={this.handleChangeBody}></textarea>
                    <ModalButtons {...this.props} handleSave={this.handleSave}/>
                </div>
            </div>
        )
    }
}

export default NoteModal;