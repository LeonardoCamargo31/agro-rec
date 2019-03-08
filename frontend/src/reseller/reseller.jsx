import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../common/form/input'
import Button from '../common/form/button'
import Breadcrumb from '../common/template/breadcrumb'
import api from "../common/api";


import SimpleReactValidator from 'simple-react-validator'



const baseUrl = 'http://localhost:5000/reseller'


const initialState = {
    reseller: { name: '', address: '' },
    list: []
}

function newValidator() {
    return new SimpleReactValidator({
        messages: {
            required: 'Esse campo é obrigatório'
        }
    })
}

var validator = newValidator()

export default class Reseller extends Component {
    constructor() {
        super()

        this.state = { ...initialState }
    }

    notifySuccess(message) {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    notifyError(message) {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    componentWillMount() {
        this.getUpdatedList()
    }

    updateField(event) {
        //pega todos os atributos
        const reseller = { ...this.state.reseller }
        reseller[event.target.name] = event.target.value
        this.setState({ reseller })
    }

    clear() {
        this.setState({ reseller: initialState.reseller })
    }

    save() {
        if (validator.allValid()) {
            const reseller = this.state.reseller

            const method = reseller._id ? 'put' : 'post'
            const url = reseller._id ? `${baseUrl}/${reseller._id}` : baseUrl


            api[method](url, reseller)
                .then(resp => {
                    this.notifySuccess('Salvo com sucesso')
                    this.getUpdatedList()
                    this.setState({ reseller: initialState.reseller })
                })

            validator = newValidator()

        } else {
            validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate()
        }
    }

    getUpdatedList() {
        api(baseUrl).then(resp => {
            this.setState({ list: resp.data.resellers })
        })
    }

    load(reseller) {
        this.setState({ reseller })
    }

    remove(reseller) {
        api.delete(`${baseUrl}/${reseller._id}`).then(resp => {
            if (resp.data.code == 1) {
                //okay, registo deletado
                this.notifySuccess('Deletado com sucesso!')
                this.getUpdatedList()
            }
            else if (resp.data.code == 2) {
                //possui produtos relacionado
                this.notifyError('Essa revendedora possui produtos relacionados!')
            }
        })
    }

    renderForm() {
        return (
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <h3 class="h4">Cadastro de revendedora</h3>
                    </div>
                    <div class="card-body">
                        <p>Informe os campos abaixo, para cadastrar uma nova revendedora</p>

                        <Input label="Nome" type="text" placeholder="Nome"
                            name="name"
                            value={this.state.reseller.name}
                            messageError={validator.message('name', this.state.reseller.name, 'required')}
                            onChange={e => this.updateField(e)} />

                        <Input label="Endereço" type="text" placeholder="Endereço" name="address"
                            messageError={validator.message('address', this.state.reseller.address, 'required')}
                            value={this.state.reseller.address}
                            onChange={e => this.updateField(e)} />

                        <div className="row">
                            <Button type="btn btn-primary" text="Cadastrar" onClick={e => this.save()} />
                            <Button type="btn btn-default" text="Cancelar" onClick={e => this.clear()} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <h3 class="h4">Revendedoras registradas</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Endereço</th>
                                        <th className="action">Produtos</th>
                                        <th className="action">Editar</th>
                                        <th className="action">Deletar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderRows() {
        return this.state.list.map(reseller => {
            return (
                <tr key={reseller._id}>
                    <td>{reseller.name}</td>
                    <td>{reseller.address}</td>
                    <td className="action"><a onClick={() => browserHistory.push({ pathname: '/product', state: { reseller: reseller } })}><div class="icon icon-search"></div></a></td>
                    <td className="action"><a onClick={() => this.load(reseller)}><div class="icon icon-search"></div></a></td>
                    <td className="action"><a onClick={() => this.remove(reseller)}><div class="icon icon-close"></div></a></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Fragment>
                <Breadcrumb current="Revendedoras" prev="Home" />
                <section>
                    <div class="container-fluid">
                        <div class="row">
                            {this.renderForm()}
                            {this.renderTable()}
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </Fragment>
        )
    }
}