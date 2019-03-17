import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {addGun, removeGun, addGunAsync} from "./redux";

@connect(
    state => ({num: state}),
    {addGun, removeGun, addGunAsync}
)
class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>当前有机关枪{this.props.num}把</h1>
                <Button onClick={() => {
                    this.props.addGun();
                }}>申请</Button>
                <Button onClick={() => {
                    this.props.removeGun();
                }}>删去</Button>
                <Button onClick={() => {
                    this.props.addGunAsync();
                }}>异步添加</Button>
            </div>
        );
    }
}

export default App;
