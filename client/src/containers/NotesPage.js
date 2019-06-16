import React, {Component} from 'react';
import Header from './Header';
import Note from './Note';
import NewNote from './NewNote';
import NoteModal from './NoteModal';
import axios from 'axios';

class NotesPage extends Component {

    state = {
        notes: [],
        modalVisible: false,
        currentNote: {}
    }

    componentDidMount() {
       this.getNotes();
    }

    setCurrentNote = (newNote) => {
        this.setState({currentNote: newNote}, function() {
            this.modalSwitch();
        });
    }

    getNotes = () => {
        if(!localStorage.getItem('aks-tk')) {
            console.log('notes mounted')
            // this.props.history.push(`/users/login`);
            const localNotes = JSON.parse(localStorage.getItem('notes'));
            this.setState({notes: localNotes ? localNotes : []}, function() {
                console.log('not signed in', this.state.notes);
            });

            return;
        }

        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }

        axios.get('/api/notes',axiosConfig).then((res) => {
            console.log(this.state.notes);
            this.setState({notes: res.data});
            console.log(this.state.notes);
        }).catch((e) => {
            console.log(e);
        });
    }

    modalSwitch = (event) => {
        this.setState((prevState) => ({
            modalVisible: !prevState.modalVisible
        }));
    }

    render() {
        let notes = this.state.notes;
        return(
            <div>
                <Header {...this.props}/>
                <ul className='notes-grid'>
                    {notes.map((note) => (
                    <Note setCurrentNote={this.setCurrentNote} key={note._id} note={note}/>
                    ))}
                </ul>
                <NewNote setCurrentNote={this.setCurrentNote}/>
                {this.state.modalVisible && 
                <NoteModal currentNote={this.state.currentNote} getNotes={this.getNotes} modalSwitch={this.modalSwitch}/>
                }
            </div>
        )
    }
}

export default NotesPage;
