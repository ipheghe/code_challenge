import React from 'react';

import currencyFormatter  from '../../helpers/formatter';

import './product.scss'

interface ProductProps {
    title: string;
    image_url: string;
    price: number;
    currency: string;
    addToCart: () => {}
}

export default function Product (props: ProductProps) {
    return (
        <div className="product__container">
            <div className="img__container">
                <img className="product__image" src={props.image_url} alt="product_image" />
            </div>
            <p className="product__title">{props.title}</p>
            <p className="product__price">{`From: ${currencyFormatter(props.price, props.currency)}`}</p>
            <button className="product__cart-btn" onClick={props.addToCart}>Add To Cart</button>
        </div>
    )
}