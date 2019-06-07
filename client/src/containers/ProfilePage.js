import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';

class ProfilePage extends Component {

    state = {
        user: {}
    }

    handleClick = () => {
        console.log('everything deleted');
        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }

        axios.post('/api/users/logoutall', {}, axiosConfig).then(() => {
            console.log('logged out all tokens')
            localStorage.removeItem('aks-tk');
            this.props.history.push(`/users/login`);
        }).catch((e) => {
            console.log(e);
        })
    }

    componentDidMount() {

        if(localStorage.getItem('aks-tk') === null) {
            console.log('token null');
            this.props.history.push(`/users/login`);
            return;
        }
        console.log(localStorage.getItem('aks-tk'));
        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }
        // let AuthStr = 'Bearer '.concat(localStorage.getItem('aks-tk'));
        // console.log(axiosConfig.headers)
        axios.get('/api/users/me', axiosConfig).then((res) => {
            console.log(res.data);
            this.setState({user: res.data});
        }).catch((e) => {
            console.log(e);
        })
    }

    componentWillUnmount() {
        console.log(('component unMounted'));
    }
    
    render() {
        
        if(typeof this.state.user.userName === 'undefined') {
            console.log('state called');

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
                <p>User Name: {this.state.user.userName}</p>
                <button onClick={this.handleClick}>Logout all</button>
            </div>
        )
    }
}

export default ProfilePage;