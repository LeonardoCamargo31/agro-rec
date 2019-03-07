import React from 'react'

export default props => (
    <button onClick={props.onClick} class={props.type}>{props.text}</button>
)
