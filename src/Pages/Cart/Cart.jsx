import { useContext } from 'react';
import CartItem from '../../Components/CartItem/CartItem';
import { CartItemsContext } from '../../Context/CartItemsContext';
import styles from './Cart.module.css';
import ProductsContext from '../../Context/ProductsContext';

const Cart = () => {

  const cartItems = useContext(CartItemsContext);

  const products = useContext(ProductsContext);

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
        <p className='text-center'>Total Price: $</p>
      }
    </div>
  )
}

export default Cart
