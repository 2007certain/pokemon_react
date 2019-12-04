import React from 'react';

function Button(props) {
    return (
        <button data-testid="button" className={props.class} onClick={props.clickHandler}>
            {props.label}
        </button>
    );
}

export default Button;