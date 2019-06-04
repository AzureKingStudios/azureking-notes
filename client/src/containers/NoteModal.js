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
            this.props.modalSwitch()
        }
    }

    handleChangeTitle = (event) => {
        console.log(event.target.value);
        this.setState({titleValue: event.target.value});
    }
    
    handleChangeBody = (event) => {
        console.log(event.currentTarget.textContent)
        this.setState({bodyValue: event.target.value});
    }

    handleSave = () => {
        const note = {
            title: this.state.titleValue,
            body: this.state.bodyValue
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
            console.log(this.state.notes);
            this.setState({notes: res.data});
            console.log(this.state.notes);
            this.props.getNotes();
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return(
            <div className='note-modal' onClick={(event) => this.handleClick(event)}>
                <div className='note-modal-content'>
                    {/* <div 
                    contentEditable 
                    className='note-input'
                    onInput={event => {this.handleChangeTitle(event)}}
                    >{this.state.titleValue}</div>
                    <div contentEditable className='note-input'></div> */}
                    <textarea 
                    className='note-input-title'
                    value={this.state.titleValue}
                    onChange={this.handleChangeTitle}></textarea>
                    <textarea 
                    className='note-input-body'
                    value={this.state.bodyValue}
                    onChange={this.handleChangeBody}></textarea>
                    <button>Cancel</button>
                    <button onClick={this.handleSave}>Save</button>
                </div>
                {/* <form className='note-modal-form'>
                    <input className='note-input'></input>
                </form> */}
            </div>
        )
    }
}

export default NoteModal;