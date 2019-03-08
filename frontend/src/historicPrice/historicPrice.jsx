import React, { Fragment, Component } from 'react'
import axios from 'axios'
import { Line  } from 'react-chartjs-2';

import Utils from '../common/utils'
import Breadcrumb from '../common/template/breadcrumb'

const baseUrl = 'http://localhost:5000/historicPrice'
const utils=new Utils()

export default class HistoricPrice extends Component {
    constructor(props) {
        super(props)
        this.state = { historic: [],productId: this.props.location.state.product._id }
    }

    componentWillMount() {
        axios(`${baseUrl}/${this.state.productId}`).then(resp => {
            this.setState({ historic: resp.data.historicPrice })
        })
    }

    render() {
        const labelHistoric= this.state.historic.map(item=>utils.formatDateTime(item.createAt))
        const dataHistoric= this.state.historic.map(item=>item.price)

        const data = {
            //minhas datas de alteração no preço
            labels: labelHistoric,
            datasets: [
              {
                label: 'Histórico do preço',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                //preços
                data: dataHistoric
              }
            ]
          };

        return (
            <Fragment>
                <Breadcrumb current="Produtos" prev="Home" />
                <section>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="line-chart-example card">
                                    <div class="card-close">
                                        <div class="dropdown">
                                            <button type="button" id="closeCard1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-ellipsis-v"></i></button>
                                            <div aria-labelledby="closeCard1" class="dropdown-menu dropdown-menu-right has-shadow"><a href="#" class="dropdown-item remove"> <i class="fa fa-times"></i>Close</a><a href="#" class="dropdown-item edit"> <i class="fa fa-gear"></i>Edit</a></div>
                                        </div>
                                    </div>
                                    <div class="card-header d-flex align-items-center">
                                        <h3 class="h4">Gráfico com histórico de preço</h3>
                                    </div>
                                    <div class="card-body">
                                        <Line data={data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>)
    }
}