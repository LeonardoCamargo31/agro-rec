import React,{Component} from 'react'
import {browserHistory} from 'react-router';

export default class Logout extends Component{

    componentWillMount(){
        localStorage.removeItem('auth-token')
        browserHistory.push('/')
    }

    render(){
        return null;//componente que não renderiza nada
    }
}