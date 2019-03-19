import React from 'react';
import {List, InputItem, WingBlank, Button, WhiteSpace} from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../redux/user-regist';
import Logo from '../component/Logo';
import {Redirect} from "react-router-dom";

@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            password:''
        }
    }
    goRegiter = () =>{
        this.props.history.push('/regist')
    };
    login = () =>{
        this.props.login(this.state);
    };
    change=(key,value)=>{
        this.setState({
            [key]: value
        })
    };
    render(){
        return(
            <div>
                <Logo/>
                {this.props.msg?<p>{this.props.msg}</p>:null}
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem onChange={(v)=>this.change('userName',v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={(v)=>this.change('password',v)} type='password'>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.login}>登陆</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.goRegiter}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;
