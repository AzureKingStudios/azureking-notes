<<<<<<< HEAD
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
||||||| merged common ancestors
=======
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
      <header className='notes-header'>
          <div className='title-container'>
            <img className='header-logo' src="https://placeimg.com/640/480/tech"></img>
            <h1 className='header-title' onClick={this.homeClick}>AzureKing Notes</h1>
          </div>
        {localStorage.getItem('aks-tk') 
        && (
            <div className='header-buttons-container'>
                <button className='header-button' onClick={this.handleLogout}>Sign Out</button>
                <button className='header-button' onClick={this.profileClick}>Profile</button>
            </div>
        )}
        
      </header>
    )
  }
}

export default Header;
>>>>>>> header
