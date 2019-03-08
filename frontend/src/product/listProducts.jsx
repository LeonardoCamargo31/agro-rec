import React, { Fragment, Component } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Utils from '../common/utils'
import Breadcrumb from '../common/template/breadcrumb'


const baseUrl = 'http://localhost:5000/product'

const initialState = {
    product: { title: '', price: '0', reseller: '' },
    list: []
}

const utils=new Utils()

export default class Product extends Component {

    constructor() {
        super()
        
        this.state = { ...initialState }
    }

    componentWillMount() {
        this.getUpdatedList()
    }

    getUpdatedList() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data.products })
        })
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
                                        <th>Data cadastro</th>
                                        <th>Ultima atualização</th>
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
                    <td>{utils.formatDateTime(product.createAt)}</td>
                    <td>{utils.formatDateTime(product.updateAt)}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Fragment>
                <Breadcrumb current="Listagem de produtos" prev="Home" />
                <section>
                    <div class="container-fluid">
                        <div class="row">
                            {this.renderTable()}
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </Fragment>
        )
    }
}