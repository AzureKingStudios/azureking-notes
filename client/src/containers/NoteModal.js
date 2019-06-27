import React, {Component} from 'react';
import ModalButtons from './ModalButtons';

class NoteModal extends Component {

    state = {
        titleValue: '',
        bodyValue: '',
        color: ''
    }

    handleChangeTitle = (event) => {
        this.setState({titleValue: event.target.value});
    }
    
    handleChangeBody = (event) => {
        this.setState({bodyValue: event.target.value});
    }

    changeColor = (newColor) => {
        this.setState({color: newColor}, () => {
            console.log(this.state.color);
        })
    }
    
    handleClick = (event) => {
        // console.log(event.target.className);
        if(event.target.className === 'note-modal') {
            this.props.modalSwitch();
        }
    }
    
    componentDidMount() {
        this.setState({
            titleValue:this.props.currentNote.title,
            bodyValue: this.props.currentNote.body,
            color: this.props.currentNote.color
        });
    }

    render() {

        const noteValue = {
            title: this.state.titleValue,
            body: this.state.bodyValue,
            color: this.state.color
        }

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
                    <ModalButtons 
                    {...this.props} 
                    noteValue={noteValue}
                    changeColor={this.changeColor}
                    />
                </div>
            </div>
        )
    }
}

export default NoteModal;