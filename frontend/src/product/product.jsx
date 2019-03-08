import React, { Fragment, Component } from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Input from '../common/form/input'
import InputMoney from '../common/form/inputMoney'
import Button from '../common/form/button'
import Breadcrumb from '../common/template/breadcrumb'

import SimpleReactValidator from 'simple-react-validator'

const baseUrl = 'http://localhost:5000/product'

const initialState = {
    product: { title: '', price: '0', reseller: '' },
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

export default class Product extends Component {
    constructor(props) {
        super(props)
        initialState.product.reseller=this.props.location.state.reseller._id
        this.state = { ...initialState, reseller: this.props.location.state.reseller }
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
        const product = { ...this.state.product }
        const { name, value } = event.target;
        product[name] = value
        this.setState({ product })
    }

    clear() {
        this.setState({ product: initialState.product })
    }

    save() {
        if (validator.allValid()) {
            const product = this.state.product
            const method = product._id ? 'put' : 'post'
            const url = product._id ? `${baseUrl}/${product._id}` : baseUrl

            axios[method](url, product)
                .then(resp => {
                    this.notifySuccess('Salvo com sucesso')
                    this.getUpdatedList()
                    this.setState({ product: initialState.product })
                })

            validator = newValidator()

        } else {
            validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate()
        }
    }

    getUpdatedList() {
        axios(`${baseUrl}/reseller/${this.state.reseller._id}`).then(resp => {
            this.setState({ list: resp.data.products })
        })
    }

    load(product) {
        this.setState({ product })
    }

    remove(product) {
        axios.delete(`${baseUrl}/${product._id}`).then(resp => {
            this.notifySuccess('Deletado com sucesso!')
            this.getUpdatedList()
        })
    }

    renderForm() {
        const product = { ...this.state.product }

        return (
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <h3 class="h4">Cadastro de produtos</h3>
                    </div>
                    <div class="card-body">
                        <p>Informe os campos abaixo, para cadastrar um novo produto</p>

                        <Input label="Título"
                            type="text"
                            placeholder="Título"
                            name="title"
                            value={product.title}
                            messageError={validator.message('title', product.title, 'required')}
                            onChange={e => this.updateField(e)} />

                        <InputMoney label="Preço" placeholder="Preço" name="price" value={product.price} onChange={e => this.updateField(e)} />

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
                        <h3 class="h4">Produtos registrados</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Preço</th>
                                        <th>Revendedora</th>
                                        <th>Histórico de preço</th>
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
        return this.state.list.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product.title}</td>
                    <td>R$ {product.price}</td>
                    <td>{this.state.reseller.name}</td>
                    <td className="action"><a onClick={() => browserHistory.push({ pathname: '/historicPrice', state: { product: product } })}><div class="icon icon-search"></div></a></td>
                    <td className="action"><a onClick={() => this.load(product)}><div class="icon icon-search"></div></a></td>
                    <td className="action"><a onClick={() => this.remove(product)}><div class="icon icon-close"></div></a></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Fragment>
                <Breadcrumb current="Produtos" prev="Home" />
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