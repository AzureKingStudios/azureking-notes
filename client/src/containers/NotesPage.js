import React, {Component} from 'react';
import Header from './Header';
import Note from './Note';
import NewNote from './NewNote';
import NoteModal from './NoteModal';
import Loader from './Loader';
import axios from 'axios';

class NotesPage extends Component {

    state = {
        notes: [],
        modalIsVisible: false,
        currentIsNote: {},
        loaderIsVisible: false
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
            this.setState({notes: res.data});
        }).catch((e) => {
            console.log(e);
            if(e.response.status === 401) {
                localStorage.removeItem('aks-tk');
                this.props.history.push(`/users/login`);
            }
        });
    }

    modalSwitch = (event) => {
        this.setState((prevState) => ({
            modalIsVisible: !prevState.modalIsVisible
        }));
    }
    
    loaderOff = () => {
        this.setState({loaderIsVisible: false});
    }

    loaderOn = () => {
        this.setState({loaderIsVisible: true});
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
                {this.state.modalIsVisible && 
                    <NoteModal 
                        currentNote={this.state.currentNote} 
                        getNotes={this.getNotes} 
                        modalSwitch={this.modalSwitch}
                        loaderOn={this.loaderOn}
                        loaderOff={this.loaderOff}
                    />
                }
                {this.state.loaderIsVisible &&
                    <Loader/>
                }
            </div>
        )
    }
}

export default NotesPage;
