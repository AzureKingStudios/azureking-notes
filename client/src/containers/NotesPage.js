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
            this.setState({notes: localNotes ? localNotes : []});

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

    showSnackbar = () => {
        let snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        setTimeout(function(){
            snackbar.className = snackbar.className.replace("show", "");
        },3000);
    }

    render() {
        let notes = this.state.notes;
        return(
            <div>
                <Header {...this.props}/>
                {!localStorage.getItem('aks-tk') && 
                    <h3 className='signin-notice'>Sign in to access notes from other devices</h3>
                    }
                {this.state.notes.length < 1 && 
                    <h2 className='empty-notes'>No notes yet, click the New Note button to create some notes</h2>    
                    }    
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
                <div id='snackbar'> snackbar toast msg</div>
                <button onClick={() => this.showSnackbar()}>click for snackbar</button>
            </div>
        )
    }
}

export default NotesPage;
