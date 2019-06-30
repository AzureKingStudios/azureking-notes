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
                <button className='modal-btn color-btn' onClick={this.toggleMenu}>Color</button>
                {this.state.menuIsShown && 
                <div className='colors-container'>
                    <button className='color-swatch' style={{backgroundColor: "white"}} onClick={() => this.handleClick('white')}></button>
                    <button className='color-swatch' style={{backgroundColor: "#F5535E"}} onClick={() => this.handleClick('red')}></button>
                    <button className='color-swatch' style={{backgroundColor: "#61dafb"}} onClick={() => this.handleClick('blue')}></button>
                    <button className='color-swatch' style={{backgroundColor: "#ffd000"}} onClick={() => this.handleClick('yellow')}></button>
                    <button className='color-swatch' style={{backgroundColor: "#00996e"}} onClick={() => this.handleClick('green')}></button>
                    <button className='color-swatch' style={{backgroundColor: "#9f79ee"}} onClick={() => this.handleClick('purple')}></button>
                </div>
                }
            </div>

        )
    }
}

export default Dropdown;