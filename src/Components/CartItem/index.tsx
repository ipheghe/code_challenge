import React from 'react';

import './cartItem.scss';



interface CartItemProps {
    id: number;
    title: string;
    image_url: string;
    price: string;
    currency: string;
    quantity: number;
    removeItem: (x:number) => void;
    handleAction: (x: number, y: string) => void;
}

export default function CartItem (props: CartItemProps) {
    return (
        <div className="cartItem__container">
            <div className="items__container">
                <h6 className="cartItem__title">{props.title}</h6> 
                <div className="cartItem__quantity-container">
                    <div className="cartItem__quantity">
                        <button className="arth__btn" onClick={() => props.handleAction(props.id, 'minus')}>-</button>
                        <p>{props.quantity}</p>
                        <button className="arth__btn" onClick={() => props.handleAction(props.id, 'add')}>+</button>
                    </div>
                    <p className="cartItem__price">{props.price}</p>
                </div>
            </div>
            <div className="img__container">
                <img className="cartItem__image" src={props.image_url} alt="product_image" />
            </div>
            <button className="close__btn" onClick={() => props.removeItem(props.id)}>X</button>
        </div>
    )
}