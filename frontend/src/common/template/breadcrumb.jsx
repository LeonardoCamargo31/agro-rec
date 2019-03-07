import React,{ Fragment } from 'react'

export default props => (
  <Fragment>
    <header className="page-header">
      <div className="container-fluid">
        <h2 className="no-margin-bottom">{props.current}</h2>
      </div>
    </header>
    <div className="breadcrumb-holder container-fluid">
      <ul className="breadcrumb">
        <li className="breadcrumb-item"><a href="index.html">{props.prev}</a></li>
        <li className="breadcrumb-item active">{props.current}</li>
      </ul>
    </div>
  </Fragment>
)

