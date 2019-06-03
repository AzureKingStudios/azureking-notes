import React, {Component} from 'react';

class NewNote extends Component {

    handleClick = () => {
        console.log('new note clicked');
        this.props.modalSwitch();
    }

    render(){
        return(
            <button className='new-note' onClick={this.handleClick}>New Note</button>
        )
    }
}

export default NewNote;  