import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {
    
    handleLogout = () => {
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

    profileClick = () => {
        this.props.history.push(`/users/me`);
    }

    homeClick = () => {
        this.props.history.push('/');
    }


  render() {
    return(
      <div className='notes-header'>
        <h1 className='header-title' onClick={this.homeClick}>AzureKing Notes</h1>
        {localStorage.getItem('aks-tk') 
        && (
            <div>
                <button onClick={this.handleLogout}>sign out</button>
                <button onClick={this.profileClick}>Profile</button>
            </div>
        )}
        
      </div>
    )
  }
}

export default Header;