import React, {Component} from 'react';
import axios from 'axios';

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
            this.updateNote(note);
            return;
        }

        this.addNote(note);
    }
    
    addNote = (note) => {

        if(!localStorage.getItem('aks-tk')){

            if(!localStorage.getItem('noteCount')){
                localStorage.setItem('noteCount', '0');
            }
            let noteCount = JSON.parse(localStorage.getItem('noteCount'));
            noteCount = noteCount+1;
            localStorage.setItem('noteCount', JSON.stringify(noteCount));
            note.id = noteCount;
            note.color = 'white';

            let notes = JSON.parse(localStorage.getItem('notes'));
            notes = notes ? notes : [];
            notes = notes.concat(note);
            localStorage.setItem('notes',JSON.stringify(notes));
            this.props.getNotes();
            this.props.modalSwitch();
            return;
        }

        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }
        
        axios.post('/api/notes',note,axiosConfig).then((res) => {
            // this.setState({notes: res.data});
            this.props.getNotes();
            this.props.modalSwitch();
        }).catch((e) => {
            console.log(e);
            this.props.modalSwitch();
        });
    }

    deleteNote = () => {

        if(!localStorage.getItem('aks-tk')) {
            let notes = JSON.parse(localStorage.getItem('notes'));
            const id = notes.findIndex(i => i.id === this.props.currentNote.id);
            notes.splice(id,1);
            localStorage.setItem('notes',JSON.stringify(notes));
            this.props.getNotes();
            this.props.modalSwitch();
            return;
        }



        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }
        
        axios.delete(`/api/notes/${this.props.currentNote._id}`,axiosConfig).then((res) => {
            // this.setState({notes: res.data});
            this.props.getNotes();
            this.props.modalSwitch();
        }).catch((e) => {
            console.log(e);
            this.props.modalSwitch();
        });
    }

    updateNote = (note) => {

        if(!localStorage.getItem('aks-tk')) {
            let notes = JSON.parse(localStorage.getItem('notes'));
            const id = notes.findIndex(i => i.id === this.props.currentNote.id);
            notes[id].title = note.title;
            notes[id].body = note.body;
            localStorage.setItem('notes',JSON.stringify(notes));
            this.props.getNotes();
            this.props.modalSwitch();
            return;
        }

        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }
        
        axios.patch(`/api/notes/${this.props.currentNote._id}`,note,axiosConfig).then((res) => {
            // this.setState({notes: res.data});
            this.props.getNotes();
            this.props.modalSwitch();
        }).catch((e) => {
            console.log(e);
            this.props.modalSwitch();
        });
    }

    componentDidMount() {
        console.log(this.props.currentNote._id);
        this.setState({
            titleValue:this.props.currentNote.title,
            bodyValue: this.props.currentNote.body
        });
        // if(Object.keys(this.props.currentNote).length >= 1){
        //     // console.log(Object.keys(this.props.currentNote).length)
        //     title = this.props.currentNote.title;
        //     body = this.props.currentNote.body;
        // }
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
                    <div className='modal-btn-container'>
                        {Object.keys(this.props.currentNote).length >= 1 && 
                        <button className='delete-btn' onClick={this.deleteNote}>Delete</button>
                        }
                        <button className='modal-btn' onClick={this.handleSave}>Save</button>
                        <button className='modal-btn' onClick={this.props.modalSwitch}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoteModal;