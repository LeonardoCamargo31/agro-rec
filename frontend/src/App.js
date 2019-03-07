import React, { Component } from 'react';

import Header from './common/template/header'
import Navbar from './common/template/navBar'
import Footer from './common/template/footer'


class App extends Component {
  constructor() {
    super();
    this.state={ userName: '', userEmail: '' }
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.setState({ userName: user.name, userEmail: user.email })
  }

  render() {
    return (

      <div class="page">
        <Header />
        <div class="page-content d-flex align-items-stretch">

          <Navbar userName={this.state.userName} userEmail={this.state.userEmail}/>
          <div class="content-inner">

            {this.props.children}

            <Footer />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
