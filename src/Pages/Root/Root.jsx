import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { useState, useEffect, useReducer } from 'react';
import ProductsContext from '../../Context/ProductsContext';
import { CartItemsContext, CartItemsDispatchContext } from '../../Context/CartItemsContext';

const cartItemsReducer = (prevCartItems, action) => {
  switch (action.type) {

    case 'add': {
      return { ...prevCartItems, [action.id]: prevCartItems.hasOwnProperty(action.id) ? prevCartItems[action.id] + 1 : 1 };
    }

    case 'remove': {
      const newCartItems = {...prevCartItems,[action.id]: prevCartItems[action.id] - 1};

      if(newCartItems[action.id] <= 0){
        delete newCartItems[action.id];
      }

      return newCartItems;
    }

    default: prevCartItems;
  }
}
const Root = () => {
  const url = 'https://dummyjson.com/products';
  const [products, setProducts] = useState([]);

  const [cartItems, cartItemsDispatch] = useReducer(cartItemsReducer, {});

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <>
      <Navbar />
      <ProductsContext.Provider value={products}>
        <CartItemsContext.Provider value={cartItems}>
          <CartItemsDispatchContext.Provider value={cartItemsDispatch}>
            <Outlet />
          </CartItemsDispatchContext.Provider>
        </CartItemsContext.Provider>
      </ProductsContext.Provider>
    </>
  )
}

export default Root
