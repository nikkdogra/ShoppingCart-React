import { useNavigate } from 'react-router-dom';
import styles from './PopUp.module.css';
import { useContext } from 'react';
import { useDispatchPopUp, usePopUp } from '../../context/PopUpContext';
import ModeContext from '../../context/ModeContext';

const PopUp = () => {
    const navigate = useNavigate();

    const mode = useContext(ModeContext);

    const { title, price, thumbnail } = usePopUp().product;

    const dispatchPopUp = useDispatchPopUp();

    const handleClick = (path) => {
        dispatchPopUp({ type: 'remove' });
        navigate(path);
    }

    return (
        <div className={`${styles.pop_up} col-9 col-md-3 d-flex flex-column justify-content-evenly align-items-center bg-${mode === 'light' ? 'danger' : 'secondary'} text-white p-5 text-center rounded`}>

            <h3>Item Added To The Cart</h3>

            <div className={styles.img_box}>
                <img src={thumbnail} alt="Product-Image" />
            </div>

            <h5>{title}</h5>

            <p className='fw-bolder'>Price: ${price}</p>

            <button className='btn btn-outline-light' onClick={() => handleClick('/')}>Continue Shopping</button>

            <button className='btn btn-outline-warning mt-3' onClick={() => handleClick('/cart')}>Go To Cart</button>

        </div>
    )
}

export default PopUp
