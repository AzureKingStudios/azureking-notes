import React, {Component} from 'react';

class Dropdown extends Component {

    state = {
        menuIsShown: false
    }

    handleClick = (color) => {
        console.log('color btn clicked');
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
                <button className='modal-btn' onClick={this.toggleMenu}>Color</button>
                {this.state.menuIsShown && 
                <div className='color-swatches'>
                    <button className='color-btn' style={{backgroundColor: "white"}} onClick={() => this.handleClick('white')}></button>
                    <button className='color-btn' style={{backgroundColor: "red"}} onClick={() => this.handleClick('red')}></button>
                    <button className='color-btn' style={{backgroundColor: "blue"}} onClick={() => this.handleClick('blue')}></button>
                    <button className='color-btn' style={{backgroundColor: "yellow"}} onClick={() => this.handleClick('yellow')}></button>
                </div>
                }
            </div>

        )
    }
}

export default Dropdown;