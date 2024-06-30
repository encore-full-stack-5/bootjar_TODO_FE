import React from 'react';

const Input = ({name, form, type = 'text', placeholder, ...props}) => {
    return (
        <>
            <div className="inptForm">
                <label>{name}</label>
                <input name={form} type={type} placeholder={placeholder} {...props} />
            </div>
        </>
    )
}

export default Input;