import { useContext } from 'react';
import CartItem from '../../Components/CartItem/CartItem';
import { CartItemsContext, CartItemsDispatchContext } from '../../Context/CartItemsContext';
import styles from './Cart.module.css';
import ProductsContext from '../../Context/ProductsContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();

  const cartItems = useContext(CartItemsContext);

  const cartItemsDispatch = useContext(CartItemsDispatchContext);

  const products = useContext(ProductsContext);

  let totalPrice = 0;

  for (let i in cartItems) {
    totalPrice += products.find(product => product.id === +i).price * cartItems[i];
  }

  const handleClearClick = () => {
    cartItemsDispatch({ type: 'clear' });
    navigate('/');
  }

  return (
    <div className={styles.cart}>
      <h2>Your Cart {Object.keys(cartItems).length ? 'Items' : 'Is Empty !'}</h2>
      <div className={styles.container}>
        {
          products.filter(item => cartItems.hasOwnProperty(item.id))
            .map(item => <CartItem key={item.id} id={item.id} title={item.title} src={item.thumbnail} price={item.price} />)
        }
      </div>
      {
        Object.keys(cartItems).length
        &&
        <>
          <p className='text-center'>Total: ${totalPrice}</p>
          <button className={styles.clear} onClick={handleClearClick}>Clear Cart</button>
        </>
      }
      <button className={styles.backToShopping} onClick={() => navigate('/')}>Back To Shopping</button>
    </div>
  )
}

export default Cart
