import React, {Component} from 'react';

class Dropdown extends Component {

    state = {
        menuIsShown: false
    }

    handleClick = (color) => {
        this.props.changeColor(color);
        this.toggleMenu();
    }
    
    toggleMenu = () => {
        this.setState((prevState) => ({
            menuIsShown: !prevState.menuIsShown
        }));
    }

    render(){
        return(
            <div className="dropdown-container">
                <button className='modal-btn color-dropdown' onClick={this.toggleMenu}>Color</button>
                {this.state.menuIsShown && 
                <div className='color-swatches'>
                    <button className='color-btn' style={{backgroundColor: "white"}} onClick={() => this.handleClick('white')}></button>
                    <button className='color-btn' style={{backgroundColor: "#F5535E"}} onClick={() => this.handleClick('red')}></button>
                    <button className='color-btn' style={{backgroundColor: "#61dafb"}} onClick={() => this.handleClick('blue')}></button>
                    <button className='color-btn' style={{backgroundColor: "#ffd000"}} onClick={() => this.handleClick('yellow')}></button>
                </div>
                }
            </div>

        )
    }
}

export default Dropdown;