import React, { Component } from 'react'


export default class Input extends Component {
    render() {
        let className,msg=''
        if(this.props.messageError!==undefined){
            msg=this.props.messageError
            msg=msg.props.children
            className='is-invalid'
        }
        
        return (
            <div class="form-group">
                <label class="form-control-label">{this.props.label}</label>
                <input
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    className={`form-control ${className}`}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange} />
                <div class="invalid-feedback">{msg}</div>
            </div>
        )
    }

}