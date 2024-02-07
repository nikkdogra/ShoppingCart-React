import { useContext, useState } from 'react';
import styles from './CartItem.module.css';
import { CartItemsContext, CartItemsDispatchContext } from '../../Context/CartItemsContext';

const CartItem = ({ title, src, id, price }) => {
    const cartItems = useContext(CartItemsContext);
    
    const cartItemsDispatch = useContext(CartItemsDispatchContext);

    const handleAddClick = () => {
        cartItemsDispatch({ type: 'add', id: id });
    }

    const handleRemoveClick = () => {
        cartItemsDispatch({ type: 'remove', id: id });
    }

    return (
        <div className={styles.item}>
            <div className={styles.img_box}>
                <img src={src} alt="Product-Image" />
            </div>
            <div className={styles.info}>
                <h4>{title}</h4>
                <p>Price: ${price}</p>
                <p>Item Total: ${price * cartItems[id]}</p>
                <div className={styles.box}>
                    <button onClick={handleRemoveClick}>-</button>
                    <p>{cartItems[id]}</p>
                    <button onClick={handleAddClick}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
