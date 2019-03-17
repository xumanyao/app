import React from 'react';
import {List, InputItem, WingBlank, Button, WhiteSpace} from 'antd-mobile'
import Logo from '../component/Logo'
export default class Login extends React.Component{
    goRegiter = () =>{
        this.props.history.push('/regist')
    }
    render(){
        return(
            <div>
                <Logo/>
                <h1>登录页</h1>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">登陆</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.goRegiter}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}