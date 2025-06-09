'use client'

import {useEffect, useState} from "react";
export const numberWithCommas = (x = '') => {
    if (x === '' || x === null || x === undefined) return '';
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}


const Input = ({value,
                   onValueChange,
                   placeholder,
                   className,
                   readOnly,
                   ratio}) => {
    const handleChange = (e) => {
        const raw = e.target.value.replace(/,/g, '');
        onValueChange?.(raw);
    };
    
    return (
        <>
            <input
                type="text"                                 // text تا بتواند «,» بگیرد
                className={`focus:outline-hidden ${className}`}
                placeholder={placeholder}
                value={
                    readOnly
                        ? numberWithCommas(value * ratio)       // ورودی دوم (read-only)
                        : numberWithCommas(value)               // ورودی اول
                }
                onChange={readOnly ? undefined : handleChange}
                readOnly={readOnly}
            />

        </>
    )
}
export default Input