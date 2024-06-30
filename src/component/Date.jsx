import React from 'react';

const Date = (date) => {
    const year = date[0];
    let month = date[1];
    let day = date[2];

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

export default Date;