import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';

class ProfilePage extends Component {

    state = {
        user: {}
    }

    handleClick = () => {
        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }

        axios.post('/api/users/logoutall', {}, axiosConfig).then(() => {
        }).catch((e) => {
            console.log(e);
        })
        localStorage.removeItem('aks-tk');
        this.props.history.push(`/users/login`);
    }

    componentDidMount() {

        if(localStorage.getItem('aks-tk') === null) {
            this.props.history.push(`/users/login`);
            return;
        }
        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }
        axios.get('/api/users/me', axiosConfig).then((res) => {
            this.setState({user: res.data});
        }).catch((e) => {
            console.log(e);
            if(e.response.status === 401) {
                localStorage.removeItem('aks-tk');
                this.props.history.push(`/users/login`);
            }
        })
    }

    render() {
        
        if(typeof this.state.user.email === 'undefined') {

            return(
                <div>
                    <Header {...this.props}/>
                    <div>no user info here</div>
                </div>
            )
        }
        return(
            <div>
                <Header {...this.props}/>
                <h1>Profile page</h1>
                <p>Joined: {this.state.user.createdAt}</p>
                <p>Email: {this.state.user.email}</p>
                <button onClick={this.handleClick}>Logout all</button>
            </div>
        )
    }
}

export default ProfilePage;