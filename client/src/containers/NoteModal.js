import React, {Component} from 'react';
import ModalButtons from './ModalButtons';
import {getNoteColor} from '../utils/noteUtils';

class NoteModal extends Component {

    state = {
        titleValue: '',
        bodyValue: '',
        color: ''
    }

    handleChangeTitle = (event) => {
        this.setState({titleValue: event.target.value});
    }
    
    handleChangeBody = (event) => {
        this.setState({bodyValue: event.target.value});
    }

    changeColor = (newColor) => {
        this.setState({color: newColor});
    }
    
    handleClick = (event) => {
        if(event.target.className === 'note-modal') {
            this.props.modalSwitch();
        }
    }
    
    componentDidMount() {
        this.setState({
            titleValue:this.props.currentNote.title,
            bodyValue: this.props.currentNote.body,
            color: this.props.currentNote.color
        });
    }

    render() {

        const noteValue = {
            title: this.state.titleValue,
            body: this.state.bodyValue,
            color: this.state.color
        }

        const noteColor = getNoteColor(noteValue.color);

        return(
            <div className='note-modal' onClick={(event) => this.handleClick(event)}>
                <div style={{backgroundColor: noteColor}} className='note-modal-content'>
                    <textarea
                    style={{backgroundColor: noteColor}}
                    maxLength='2000' 
                    className='note-input-title'
                    placeholder='Note Title'
                    value={this.state.titleValue}
                    onChange={this.handleChangeTitle}></textarea>
                    <textarea
                    style={{backgroundColor: noteColor}} 
                    maxLength='2000' 
                    className='note-input-body'
                    placeholder='Note Body'
                    value={this.state.bodyValue}
                    onChange={this.handleChangeBody}></textarea>
                    <ModalButtons 
                    {...this.props} 
                    noteValue={noteValue}
                    changeColor={this.changeColor}
                    />
                </div>
            </div>
        )
    }
}

export default NoteModal;