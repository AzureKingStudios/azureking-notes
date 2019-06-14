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
          this.props.history.push(`/users/login`);
        }).catch((e) => {
          console.log(e);
        })
        localStorage.removeItem('aks-tk');
    }

    profileClick = () => {
        this.props.history.push(`/users/me`);
    }

    homeClick = () => {
        this.props.history.push('/');
    }

    loginClick = () => {
        this.props.history.push('/users/login');
    }


  render() {
    return(
      <header className='notes-header'>
          <div className='title-container'>
            <img className='header-logo' onClick={this.homeClick} src="https://placeimg.com/640/480/tech" alt='azure king studios logo'></img>
            <h1 className='header-title' onClick={this.homeClick}>AzureKing Notes</h1>
          </div>
        {localStorage.getItem('aks-tk') 
        && (
            <div className='header-buttons-container'>
                <button className='header-button' onClick={this.handleLogout}>Sign Out</button>
                <button className='header-button' onClick={this.profileClick}>User</button>
            </div>
        )}
        {!localStorage.getItem('aks-tk')
        && (
          <button className='header-button' onClick={this.loginClick}>Sign In</button>
        )

        }
      </header>
    )
  }
}

export default Header;
