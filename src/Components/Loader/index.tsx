import React from 'react';

// styles
import './loader.scss'

function Loader (props: any) {
    return (
        <div className="loader__container">
            <div className="loader" style={props.style}></div>
        </div>
    )
}

export default Loader;