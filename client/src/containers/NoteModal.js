import React, {Component} from 'react';
import ModalButtons from './ModalButtons';

class NoteModal extends Component {

    state = {
        titleValue: '',
        bodyValue: ''
    }

    handleChangeTitle = (event) => {
        this.setState({titleValue: event.target.value});
    }
    
    handleChangeBody = (event) => {
        this.setState({bodyValue: event.target.value});
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
            bodyValue: this.props.currentNote.body
        });
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
                    <ModalButtons 
                    {...this.props} 
                    titleValue={this.state.titleValue}
                    bodyValue={this.state.bodyValue}
                    />
                </div>
            </div>
        )
    }
}

export default NoteModal;