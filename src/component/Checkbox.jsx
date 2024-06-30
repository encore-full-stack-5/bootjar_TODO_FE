import React from 'react';

const Checkbox = ({id, check = false, disabled = false}) => {
    return (
        <>
            <input type="checkbox" id={id} defaultChecked={check} disabled={disabled} />
            <label htmlFor={id}></label>
        </>
    )
}

export default Checkbox;