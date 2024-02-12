import { useContext } from 'react';
import CartItem from '../components/CartItem/CartItem';
import { useCartItems, useDispatchCartItems } from '../context/CartItemsContext';
import HomeLinkButton from '../components/HomeLinkButton';
import ProductsContext from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useCartItems();
  const dispatchCartItems = useDispatchCartItems();
  const products = useContext(ProductsContext);

  const cartItemsArr = products.filter(product => Object.keys(cartItems).includes(String(product.id)));

  const countSubTotal = () => {
    let total = 0;
    cartItemsArr.forEach(item => {
      total += item.price * cartItems[item.id];
    });
    return total;
  }

  const handleClearClick = () => {
    dispatchCartItems({ type: 'clear' });
    navigate('/');
  }

  return (
    <>
      <h1 className='text-center'>Your Cart {cartItemsArr.length ? <>Items</> : <>Is Currently Empty</>}</h1>

      <div className='w-75 mx-auto'>
        {
          cartItemsArr.map(item => <CartItem
            key={item.id}
            id={item.id}
            src={item.thumbnail}
            title={item.title}
            price={item.price}
            count={cartItems[item.id]}
          />)
        }
      </div>

      <div className="text-center mt-3">
        {
          cartItemsArr.length
            ?
            <>
              <button className='btn btn-outline-danger' onClick={handleClearClick}>Clear Cart</button>
              <p className='text-center fs-3 mt-3'>SUBTOTAL: ${countSubTotal()}</p>
            </>
            :
            <HomeLinkButton>Back To Shopping</HomeLinkButton>
        }
      </div>

    </>
  )
}

export default Cart
