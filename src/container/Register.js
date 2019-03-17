import React from 'react';
import Logo from '../component/Logo';
import { connect } from 'react-redux';
import { regist } from '../redux/user-regist'
import {List, InputItem, WingBlank, Button, WhiteSpace,  Radio} from 'antd-mobile';
const RadioItem = Radio.RadioItem;
@connect(state=>state.user,{regist})
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            password:'',
            rePassword:'',
            type: 'boss'
        }
    }
    change=(key,value)=>{
        console.log(`${key}has been chageed`);
        this.setState({
            [key]: value
        })
    };
    regiter=()=>{
        console.log('regist');
        this.props.regist(this.state);
    };
    render(){
        return(
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg?<p>{this.props.msg}</p>:null}
                        <WhiteSpace/>
                        <InputItem onChange={(v)=>this.change('userName',v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={(v)=>this.change('password',v)} type='password'>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={(v)=>this.change('reRassword',v)} type='password'>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type==='genuis'}
                        onChange={()=>{
                            this.change('type','genuis')}}>
                        牛人
                    </RadioItem>
                    <RadioItem
                        checked={this.state.type==='boss'}
                        onChange={()=>{
                            this.change('type','boss')}}>
                        Boss
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={()=>this.regiter()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register;
