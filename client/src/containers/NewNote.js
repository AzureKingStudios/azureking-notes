import React, {Component} from 'react';

class NewNote extends Component {

    handleClick = (event) => {
        this.props.setCurrentNote({});
    }

    render(){
        return(
            <button className='new-note' onClick={(event) => this.handleClick(event)}>New Note</button>
        )
    }
}

export default NewNote;  