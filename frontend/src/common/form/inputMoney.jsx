import React from 'react'
import CurrencyInput from 'react-currency-input';

export default props => (
    <div class="form-group">
        <label class="form-control-label">{props.label}</label>

        <CurrencyInput
            className="form-control"
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onChangeEvent={props.onChange} />
    </div>
)