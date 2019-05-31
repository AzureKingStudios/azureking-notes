import React, {Component} from 'react';
import Header from './Header';

class NotesPage extends Component {

    componentDidMount() {
        if(!localStorage.getItem('aks-tk')) {
            console.log('notes mounted')
            this.props.history.push(`/users/login`);
        }
    }

    render() {
        return(
            <div>
                <Header {...this.props}/>
                <div>Notes Page</div>
            </div>
        )
    }
}

export default NotesPage;