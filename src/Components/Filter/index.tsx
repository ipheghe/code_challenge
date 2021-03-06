import React, { useState } from 'react';

import './filter.scss';

const filters: any = {
    filter_by: {
        title: 'All Products',
        tagline: 'A 360° look at Lumin'
    },
    all_products: {
        title: 'All Products',
        tagline: 'A 360° look at Lumin'
    },
    new_products: {
        title: 'New Products',
        tagline: 'Brand new upgrades for your routine'
    },
    sets: {
        title: 'All Products',
        tagline: 'Find your perfect routine'
    },
    skin_care: {
        title: 'Skin Care',
        tagline: 'Unlock your full face potential'
    },
    hair_and_body_care: {
        title: 'Har & Body Care',
        tagline: 'Lather up with the good stuff'
    },
    accessories: {
        title: 'Accessories',
        tagline: 'Accessories'
    }
};

export default function Filter () {

    const [value, setValue] = useState('filter_by');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        event.preventDefault();
        setValue(event.target.value);
    }
    
    return (
        <div className="filter__container">
            <div className="title__caption">
                <h2>{filters[value].title}</h2>
                <p>{filters[value].tagline}</p>
            </div>
            <div className="select__container">
                <select value={value} onChange={handleSelectChange} className="filter__input">
                    <option value="filter_by">Filter By</option>
                    <option value="all_products">All Products</option>
                    <option value="new_products">New Products</option>
                    <option value="sets">Sets</option>
                    <option value="skin_care">Skin Care</option>
                    <option value="hair_and_body_care">Har & Body Care</option>
                    <option value="accessories">Accessories</option>
                </select>
            </div>
        </div>
    )
}