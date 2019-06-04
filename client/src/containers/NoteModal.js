import React, {Component} from 'react';
import axios from 'axios';

class NoteModal extends Component {

    state = {
        titleValue: '',
        bodyValue: ''
    }

    handleClick = (event) => {
        console.log(event.target.className);
        if(event.target.className === 'note-modal') {
            this.props.modalSwitch();
        }
    }

    handleChangeTitle = (event) => {
        console.log(event.target.value);
        this.setState({titleValue: event.target.value});
    }
    
    handleChangeBody = (event) => {
        this.setState({bodyValue: event.target.value});
    }

    handleSave = () => {
        const note = {
            title: this.state.titleValue.trim(),
            body: this.state.bodyValue.trim()
        }

        if(note.title === '' && note.body === ''){
            this.props.modalSwitch();
            return;
        }

        this.addNote(note);
    }
    
    addNote = (note) => {
        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }
        
        axios.post('/api/notes',note,axiosConfig).then((res) => {
            this.setState({notes: res.data});
            this.props.getNotes();
            this.props.modalSwitch();
        }).catch((e) => {
            console.log(e);
            this.props.modalSwitch();
        });
    }

    render() {
        return(
            <div className='note-modal' onClick={(event) => this.handleClick(event)}>
                <div className='note-modal-content'>
                    <textarea 
                    className='note-input-title'
                    value={this.state.titleValue}
                    onChange={this.handleChangeTitle}></textarea>
                    <textarea 
                    className='note-input-body'
                    value={this.state.bodyValue}
                    onChange={this.handleChangeBody}></textarea>
                    <button onClick={this.props.modalSwitch}>Cancel</button>
                    <button onClick={this.handleSave}>Save</button>
                </div>
            </div>
        )
    }
}

export default NoteModal;