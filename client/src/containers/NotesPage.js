import React, {Component} from 'react';
import Header from './Header';
import Note from './Note';
import axios from 'axios';

class NotesPage extends Component {

    state = {
        notes: []
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
        })
    }

    render() {
        let notes = this.state.notes;
        return(
            <div>
                <Header {...this.props}/>
                <div>Notes Page</div>
                <div>
                    {notes.map((note) => (
                    <Note key={note._id} note={note}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default NotesPage;