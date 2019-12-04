import React from 'react';

function Slide(props) {
    return <div className="slide">
        <p>
            <span style={{ flex: '1', textTransform: 'uppercase' }}>{props.data.name}</span>
            <span style={{ flex: '1', textAlign: 'right' }}>ID: {props.data.id}</span>
        </p>
        <img style={{
            margin: '10% auto',
            display: 'block'
        }} src={props.data.sprites.front_default} alt={props.data.name} />
    </div >
}

export default Slide;