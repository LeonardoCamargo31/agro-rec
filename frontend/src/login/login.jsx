import React, { Component } from 'react'
import {browserHistory} from 'react-router';

export default class Login extends Component {
    constructor() {
        super()

        this.state = { mensagem: "" }
    }


    envia(event){
        event.preventDefault();

        const requestInfo = {
            method:'POST',
            body:JSON.stringify({email:this.email.value,password:this.senha.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
        
        fetch('http://localhost:5000/auth/authenticate', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    //assim interrompe o fluxo
                    throw new Error('Não foi possível fazer o login');
                }
            })
            .then(response => {
                //okay deu certo, temos o token
                response=JSON.parse(response)

                localStorage.setItem('auth-token',response.token)
                localStorage.setItem('user',JSON.stringify(response.user))
                browserHistory.push('/reseller');//para navegar a esse endereço
            })
            .catch(error=>{
                this.setState({mensagem:error.message})
            })
    }

    render() {
        return (
            <div className="page login-page">
                <div className="container d-flex align-items-center">
                    <div className="form-holder has-shadow">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="info d-flex align-items-center">
                                    <div className="content">
                                        <div className="logo">
                                            <h1>AgroRec</h1>
                                        </div>
                                        <p>{this.state.mensagem}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 bg-white">
                                <div className="form d-flex align-items-center">
                                    <div className="content">
                                        <form onSubmit={this.envia.bind(this)}>
                                            <div className="form-group">
                                                <input ref={(input) => this.email = input} type="text" className="input-material" />
                                                <label for="login-username" className="label-material">E-mail</label>
                                            </div>
                                            <div className="form-group">
                                                <input ref={(input) => this.senha = input} type="password" className="input-material" />
                                                <label for="login-password" className="label-material">Senha</label>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyrights text-center">
                    <p>Design by <a href="https://bootstrapious.com/p/admin-template" className="external">Bootstrapious</a></p>
                </div>
            </div>
        )
    }
}