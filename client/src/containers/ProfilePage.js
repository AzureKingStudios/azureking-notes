import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';

class ProfilePage extends Component {

    state = {
        user: {}
    }

    componentDidMount() {

        if(localStorage.getItem('aks-tk') === null) {
            console.log('token null')
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
                <div>no user info here</div>
            )
        }
        return(
            <div>
                <Header/>
                <h1>Profile page</h1>
                <p>Joined: {this.state.user.createdAt}</p>
                <p>Email: {this.state.user.email}</p>
                <p>User Name: {this.state.user.userName}</p>
            </div>
        )
    }
}

export default ProfilePage;