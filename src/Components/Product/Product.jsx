import { useContext } from 'react';
import styles from './Product.module.css';
import { CartItemsContext, CartItemsDispatchContext } from '../../Context/CartItemsContext';

const Product = ({ id, src, title, price }) => {
  const cartItems = useContext(CartItemsContext);

  const cartItemsDispatch = useContext(CartItemsDispatchContext);

  const handleAddClick = () => {
    cartItemsDispatch({type: 'add',id: id});
  }

  return (
    <div className={styles.product}>
      <img src={src} alt="Product-Image" />
      <h4>{title}</h4>
      <p>${price}</p>
      <button onClick={handleAddClick}>Add to Cart {cartItems[id] && `(${cartItems[id]})`}</button>
    </div>
  )
}

export default Product
