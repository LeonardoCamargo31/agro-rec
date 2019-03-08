import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import App from './App';
import Reseller from './reseller/reseller';
import Product from './product/product';
import ListProduct from './product/listProducts';
import Login from './login/login';
import Logout from './login/logout';
import HistoricPrice from './historicPrice/historicPrice';


//É uma forma melhor de controlarmos o acesso a rota. Se tivermos várias rotas, conseguimos colocar o onEnter
function verificaAutenticacao(nextState,replace) {
    //console.log(localStorage.getItem('auth-token'))
    const auth=localStorage.getItem('auth-token')
    if( auth=== null || auth=== ''){
        replace('/');
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/index" component={App} onEnter={verificaAutenticacao}>
            <Route path="/reseller" component={Reseller}/>
            <Route path="/product" component={Product}/>
            <Route path="/listProducts" component={ListProduct}/>
            <Route path="/historicPrice" component={HistoricPrice}/>
            <Route path="/logout" component={Logout}/>
        </Route>
    </Router>
), document.getElementById('root'));
