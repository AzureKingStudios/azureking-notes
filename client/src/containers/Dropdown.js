import React, {Component} from 'react';

class Dropdown extends Component {

    state = {
        menuIsShown: false
    }

    handleClick = () => {
        console.log('color btn clicked');
        this.setState((prevState) => ({
            menuIsShown: !prevState.menuIsShown
        }));
    }
    render(){
        return(
            <div className="dropdown-container">
                <button className='modal-btn' onClick={this.handleClick}>Color</button>
                {this.state.menuIsShown && 
                <div className='color-swatches'>
                    <button className='color-btn' style={{backgroundColor: "white"}} onClick={this.handleClick}></button>
                    <button className='color-btn' style={{backgroundColor: "red"}} onClick={this.handleClick}></button>
                    <button className='color-btn' style={{backgroundColor: "blue"}} onClick={this.handleClick}></button>
                    <button className='color-btn' style={{backgroundColor: "yellow"}} onClick={this.handleClick}></button>
                </div>
                }
            </div>

        )
    }
}

export default Dropdown;