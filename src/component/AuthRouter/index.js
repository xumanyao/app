import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

@withRouter
class AuthRouter extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/regist'];
        const pathName = this.props.history.pathName;
        if (publicList.includes(pathName)) {
            return;
        }
        axios.get('/user/info').then((res) => {
            if (res.status === 200) {
                if (res.data.code) {
                    this.props.history.push('/login');
                }
            }
        });
    }
    render() {
        return null;
    }
}

export default AuthRouter;