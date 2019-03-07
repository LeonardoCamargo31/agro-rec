import React, { Component } from 'react'

export default class Input extends Component {
    

    render() {
        let className, msg = ''
        if (this.props.messageError !== undefined) {
            msg = this.props.messageError
            msg = msg.props.children
            className = 'is-invalid'
        }
  
        return (
            <div class="form-group">
                <label class="form-control-label">{this.props.label}</label>

                <select name={this.props.name} className={`form-control ${className}`} onChange={this.props.onChange} >
                    {this.props.list.map(item => {
                        return (<option key={item._id} value={item._id}>{item.name}</option>)
                    })}
                </select>
                <div class="invalid-feedback">{msg}</div>
            </div>
        )
    }
}