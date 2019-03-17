import React from 'react';
import flower from './flower.png'
import './css.css'
export default class Logo extends React.Component{
    render(){
        return(
            <div className='logo'>
                <img src={flower} alt=""/>
            </div>
        )
    }
}