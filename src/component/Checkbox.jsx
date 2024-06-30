import React from 'react';

const Checkbox = ({id, check = false}) => {
    return (
        <>
            <input type="checkbox" id={id} defaultChecked={check} />
            <label htmlFor={id}></label>
        </>
    )
}

export default Checkbox;