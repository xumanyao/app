import React from 'react';
import axios from 'axios';
import { loadData } from '../../redux/user-regist';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRouter extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/regist'];
        const pathName = this.props.history.pathName;
        if (publicList.includes(pathName)) {
            return;
        }
        axios.get('/user/info').then((res) => {
            if (res.status === 200) {
                if (res.data.code === '0') {
                    console.log(res.data);
                    this.props.loadData(res.data.data)
                }
                if (res.data.code==='1') {
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