import React from 'react';
import CartItem from '../CartItem';

import currencyFormatter  from '../../helpers/formatter';

// styles
import './cart.scss';

interface CartItemData {
    id: number;
    title: string;
    image_url: string;
    price: number;
    quantity: number;
    totalAmount: number
  }

interface CartProps {
    closeCart: () => void;
    currency: string;
    currencies: string[];
    subTotal: number;
    cartItems: CartItemData[];
    removeItem: (x:number) => void;
    handleSelectCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleAction: (x: number, y: string) => void;
    overrideStyle: any;

}

function Cart (props: CartProps) {

    return  (
        <div className="cart__container" style={props.overrideStyle}>
            <div className="top__container">
                <div className="fixed-div">
                    <div className="title__content">
                        <button className="close__cart" onClick={props.closeCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
                                <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z">
                                </path>
                            </svg>
                        </button>
                        <div className="cart_title">YOUR CART</div>
                        <div></div>
                    </div>
                    <select value={props.currency} onChange={(e) => props.handleSelectCurrencyChange(e)} className="currency__dropdown">
                        {props.currencies.map((item:string) => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div style={{ zIndex: 1, marginTop: '120px' }}>
                    {props.cartItems.length ? props.cartItems.map((item: CartItemData) => (
                        <CartItem
                            id={item.id}
                            title={item.title}
                            image_url={item.image_url}
                            price={currencyFormatter(item.totalAmount, props.currency)}
                            currency={props.currency}
                            quantity={item.quantity}
                            removeItem={props.removeItem}
                            handleAction={props.handleAction}
                        />
                    )) : <h1>NO ITEM IN CART</h1>}
                </div>
            </div>
            <div className="bottom__section">
                <div className="total__content">
                    <div>Subtotal</div>
                    <div className="subtotal">{currencyFormatter(props.subTotal, props.currency)}</div>
                </div>
                <button className="bottom__btn">MAKE THIS A SUBSCRIPTION (SAVE 20%)</button>
                <button className="bottom__btn checkout">PROCEED TO CHECKOUT</button>
            </div>

        </div>
    )
}

export default Cart;