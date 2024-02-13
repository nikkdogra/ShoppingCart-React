import { useContext } from 'react';
import styles from './Product.module.css';
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatchCartItems } from '../../context/CartItemsContext';
import SetPopUpVisibilityContext from '../../context/SetPopUpVisibilityContext';
import ModeContext from '../../context/ModeContext';

const Product = ({ id, title, src, price, inCart }) => {
  const navigate = useNavigate();

  const mode = useContext(ModeContext);

  const dispatchCartItems = useDispatchCartItems();

  const setPopUpVisibility = useContext(SetPopUpVisibilityContext);

  const handleBtnClick = () => {
    if (inCart) return;

    setPopUpVisibility({ visible: true, id: id });
    dispatchCartItems({ type: 'add', id: id });
  }

  return (
    <div className={`${styles.product} rounded m-2 text-white bg-${mode === 'light' ? 'primary' : 'dark'}`}>

      <div className={`${styles.img_box} position-relative`}>

        <img src={src} alt="Product-Image" onClick={() => navigate(`/product/${id}`)} />

        {
          !inCart
          &&
          <button className={`${styles.btn} btn btn-${mode === 'light' ? 'info' : 'secondary'} position-absolute bottom-0 end-0`} onClick={handleBtnClick}>
            <FaCartPlus />
          </button>
        }

      </div>

      <div className={`${styles.details_box} d-flex justify-content-between align-items-center px-2`}>
        <h5>{title}</h5>
        <p>${price}</p>
      </div>

    </div>
  )
}

export default Product
