import React, {Component} from 'react';
import Header from './Header';
import Note from './Note';
import NewNote from './NewNote';
import NoteModal from './NoteModal';
import axios from 'axios';

class NotesPage extends Component {

    state = {
        notes: [],
        modalVisible: false
    }

    componentDidMount() {
        if(!localStorage.getItem('aks-tk')) {
            console.log('notes mounted')
            this.props.history.push(`/users/login`);
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

    modalSwitch = () => {
        this.setState((prevState) => ({
            modalVisible: !prevState.modalVisible
        }))
    }

    render() {
        let notes = this.state.notes;
        return(
            <div>
                <Header {...this.props}/>
                <div>Notes Page</div>
                <div className='notes-grid'>
                    {notes.map((note) => (
                    <Note key={note._id} note={note}/>
                    ))}
                </div>
                <NewNote modalSwitch={this.modalSwitch}/>
                {this.state.modalVisible && 
                <NoteModal modalSwitch={this.modalSwitch}/>
                }
            </div>
        )
    }
}

export default NotesPage;
