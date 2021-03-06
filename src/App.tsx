import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import Navbar from './Components/Navbar';
import Filter from './Components/Filter';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Loader from './Components/Loader';

import './App.scss';

interface Product {
  id: number;
  title: string;
  image_url: string;
  price: number;
}

interface CartItem {
  id: number;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
  totalAmount: number
}

interface ProductData {
  products: Product[];
}

interface CurrencyData {
  currency: string[];
}
interface ProductVariables {
  currency: string;
}

interface AppState {
  currency: string;
  currencies: string[];
  products: Product[];
  cartItems: any;
  subTotal: number;
  openCart: boolean;
  quantityCount: number;
}

const GET_PRODUCTS = gql`
  query($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

const GET_CURRENCIES = gql`
  query {
    currency
  }
`;

function App() {

  const [state, setState] = useState<AppState>({
    currency: 'USD',
    currencies: ['USD'],
    products: [],
    cartItems: [],
    subTotal: 0,
    openCart: false,
    quantityCount: 0
  });

  const { data: currenciesResponse } = useQuery<CurrencyData>(GET_CURRENCIES);

  const { loading: fetchingProducts, data: productsResponse } = useQuery<ProductData, ProductVariables>(
    GET_PRODUCTS,
    {
      variables: {
        currency: state.currency,
      },
    }
  );

  const { currencies, products, openCart, currency, cartItems, subTotal, quantityCount } = state;


  // function to set the subTotal and quantity count to state
  const getSubTotal = () => {
    setState((prevState) => ({
      ...prevState,
      subTotal: prevState.cartItems.reduce((acc: number, cv: CartItem) => acc + cv.totalAmount, 0),
      quantityCount: prevState.cartItems.reduce((acc: number, cv: CartItem) => acc + cv.quantity, 0)
    }));
  };


  // function to toggle cart visibility
  const showCart = () => {
    setState((prevState) => {
      return {
        ...prevState,
        openCart: !prevState.openCart,
      };
    });
  };


  // function to add item to cart
  const handleAddToCart = (id: number) => {
    const selectedProduct: any = products.find(
      ({ id: productId }) => `${productId}` === `${id}`
    );

    const newCartEntry = {
      ...selectedProduct,
      quantity: 1,
      totalAmount: selectedProduct.price,
    };

    setState((prevState) => {
      const productExistInCart = prevState.cartItems.find(
        (item: Product) => `${item.id}` === `${id}`
      );

      if (!productExistInCart) {
        return {
          ...prevState,
          cartItems: prevState.cartItems.concat(newCartEntry),
        };
      } else {
        return {
          ...prevState,
          cartItems: prevState.cartItems.map((item: CartItem) => {
            const quantity = item.quantity + 1;

            return `${item.id}` === `${id}`
              ? {
                  ...item,
                  quantity,
                  totalAmount: quantity * item.price,
                }
              : item;
          }),
        };
      }
    });

    getSubTotal();
    showCart();
  };

  // function to clos cart
  const handleCloseCart = () => {
    setState((prevState) => ({
      ...prevState,
      openCart: false
    }))
  }

  // function to update quantity of item
  const updateQuantity = (items: CartItem[], id: number, type: string) => {
    const updatedCartItem = [];
    for (let item of items) {
      if (type !== 'minus' || item.id !== id || item.quantity > 1 ) {
        const newQuantity = type === "add" ? item.quantity + 1 : item.quantity - 1;
        if (item.id === id) {
          updatedCartItem.push({
            ...item,
            quantity: newQuantity,
            totalAmount: newQuantity * item.price,
          });
        } else {
          updatedCartItem.push(item)
        }
      }
    }


    return updatedCartItem;
  }

  // function to handle increment and decrement actions
  const handleAction = (id: number, type: string) => {

    setState((prevState) => ({
      ...prevState,
      cartItems: updateQuantity(prevState.cartItems, id, type)
    }));

    getSubTotal();
  }

  // function to remove item from cart
  const handleRemoveItem = (id: number) => {
    setState((prevState) => ({
      ...prevState,
      cartItems: prevState.cartItems.filter(
        (item: CartItem) => `${item.id}` !== `${id}`
      ),
    }));

    getSubTotal();
  };


  // function to change currency selection
  const handleSelectCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      currency: event.target.value,
    }));
}

  useEffect(() => {
    if (productsResponse?.products) {
      setState((prevState) => ({
        ...prevState,
        products: productsResponse.products,
        cartItems: prevState.cartItems.map((cartData: CartItem) => {
          const presentCartItem: any = productsResponse.products.find(
            ({ id }) => `${id}` === `${cartData.id}`
          );
          return {
            ...cartData,
            price: presentCartItem.price,
            totalAmount: cartData.quantity * presentCartItem.price,
          };
        }),
      }));

      getSubTotal();
    }
  }, [productsResponse, currency]);

  useEffect(() => {
    if (currenciesResponse?.currency) {
      setState((prevState) => ({
        ...prevState,
        currencies: currenciesResponse.currency,
      }));
    }
  }, [currenciesResponse]);


  if (fetchingProducts) {
    return (
        <Loader />
    );
  }


  return (
    <div className="App" style={{ overflowY: openCart ? 'hidden' : 'unset' }}>
      <header className="App-header">
        <Navbar  quantityCount={quantityCount} showCart={showCart} />
      </header>
      <Filter />
      <ProductList
        addToCart={(x) => handleAddToCart(x)}
        products={state.products}
        currency={state.currency}
      />
      {state.openCart && (
        <Cart
          currencies={currencies}
          currency={currency}
          closeCart={handleCloseCart}
          subTotal={subTotal}
          cartItems={cartItems}
          removeItem={(id) => handleRemoveItem(id)}
          handleSelectCurrencyChange={handleSelectCurrencyChange}
          handleAction={(id, type) => handleAction(id, type)}
          overrideStyle={{ display: openCart ? 'unset' : 'none' }}
        />
      )}
      <div className="overlay" style={{ display: openCart ? 'unset' : 'none' }} />
    </div>
  );
}

export default App;
