import { useContext } from 'react';
import { useDispatchCartItems } from '../../context/CartItemsContext';
import styles from './CartItem.module.css';
import ModeContext from '../../context/ModeContext';

const CartItem = ({ id, src, title, price, count }) => {

  const dispatchCartItems = useDispatchCartItems();

  const mode = useContext(ModeContext);

  return (
    <div className="mx-auto my-5 rounded p-3" style={{ boxShadow: `0 0 5px ${mode === 'light' ? 'blue' : 'azure'}` }}>

      <div className="row justify-content-evenly">

        <div className="col-12 col-md-5">
          <img src={src} className={`rounded ${styles.cart_img}`} alt="Product-Image" />
        </div>

        <div className="col-12 col-md-5 mt-3 text-center text-xl-start">
          <h3>{title}</h3>

          <p className='my-2 my-md-3 fs-4 fw-bolder'>${price}</p>

          <div className='d-flex align-items-center'>
            <button className={`${styles.btn} btn btn-${mode === 'light' ? 'primary' : 'light'} btn-sm fw-bolder fs-5`} onClick={() => dispatchCartItems({ type: 'remove', id: id })}>-</button>

            <p className='bg-secondary text-light mt-3 py-2 px-3'>{count}</p>

            <button className={`${styles.btn} btn btn-${mode === 'light' ? 'primary' : 'light'} btn-sm fw-bolder fs-5`} onClick={() => dispatchCartItems({ type: 'add', id: id })}>+</button>
          </div>

          {
            count > 1
            &&
            <p className='my-2 my-md-3 fs-4'>Item Total: ${price * count}</p>
          }

        </div>

      </div>

    </div>
  )
}

export default CartItem
