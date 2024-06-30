import React from 'react';

const Checkbox = ({id, check = false, disabled = false, clickHandler}) => {
    return (
        <>
            <input type="checkbox" id={id} defaultChecked={check} readOnly={disabled} onClick={clickHandler} />
            <label htmlFor={id}></label>
        </>
    )
}
export default Checkbox;