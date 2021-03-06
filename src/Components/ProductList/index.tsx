import React from 'react';
import Product from '../Product';

import './productList.scss';

interface ProductItem {
    id: number;
    title: string;
    image_url: string;
    price: number;
}

interface ProductListProps {
    products: ProductItem[];
    currency: string;
    addToCart: (x: number) => any;
}

export default function ProductList (props: ProductListProps) {

    const addToCart = (id: number) => props.addToCart(id);

    return (
        <div className="productList__container">
            {
                props?.products.map((item:ProductItem) => 
                    <Product
                        key={item.id}
                        title={item.title}
                        image_url={item.image_url}
                        price={item.price}
                        currency={props.currency}
                        addToCart={() => addToCart(item.id)}
                    />
                )
            }
        </div>
    )
}