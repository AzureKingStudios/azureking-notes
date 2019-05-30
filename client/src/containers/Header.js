import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {
    
    handleClick = () => {
        console.log('everything deleted');
        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }

        axios.post('/api/users/logout', {}, axiosConfig).then(() => {
            localStorage.removeItem('aks-tk');
            this.props.history.push(`/users/login`);
        }).catch((e) => {
            console.log(e);
        })
    }


  render() {
    return(
      <div>
        <h1>AzureKing Notes</h1>
        {localStorage.getItem('aks-tk') 
            && (<button onClick={this.handleClick}>sign out</button>)}
        
      </div>
    )
  }
}

export default Header;