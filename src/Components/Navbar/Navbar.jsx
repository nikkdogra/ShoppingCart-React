import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
            <Link to='/' className={styles.link}>Shop</Link>
        </li>
        <li>
            <Link to='cart' className={styles.link}>
                <FiShoppingCart/>
            </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
