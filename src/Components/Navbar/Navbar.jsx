import { Link, NavLink, useLocation } from 'react-router-dom';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useContext } from 'react';
import ModeContext from '../../context/ModeContext';
import { useProducts } from '../../context/ProductsContext';
import { useSearch } from '../../context/SearchContext';
import { useCartItems } from '../../context/CartItemsContext';

const Navbar = ({ onToggleMode }) => {
  const mode = useContext(ModeContext);

  const location = useLocation().pathname;

  const { search, setSearch } = useSearch();

  const { searchProducts } = useProducts();

  const cartItems = useCartItems();

  let totalItems = 0;

  cartItems.forEach((item) => {
    totalItems += item.count;
  })

  const handleChange = (e) => {
    setSearch(e.target.value);
    searchProducts(e.target.value);
  }

  return (
    <nav className={`navbar navbar-expand-lg bg-${mode === 'light' ? 'primary' : 'body-tertiary'} position-sticky top-0 z-1`} data-bs-theme={mode}>

      <div className="container-fluid px-5">

        <NavLink to='/' className="navbar-brand"><span className={`badge px-3 py-2 bg-white text-${mode === 'light' ? 'primary' : 'black'}`}>MY SHOP</span></NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to='/' className={({ isActive }) => `nav-link text-white ${isActive && 'fw-bolder'}`} aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item position-relative">
              <NavLink to='/cart' className={({ isActive }) => `nav-link text-white ${isActive && 'fw-bolder'}`}>Cart</NavLink>
              <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger" style={{top: '15%'}}>
                {totalItems > 0 && totalItems}
              </span>
            </li>
          </ul>
          <div className='d-flex flex-column-reverse flex-lg-row gap-lg-3'>
            {
              location === '/'
              &&
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleChange} />
            }

            <div className='d-flex gap-2' style={{ cursor: "pointer" }} onClick={onToggleMode}>
              <p className='text-white d-block d-lg-none pt-1'>{mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()} Mode</p>
              {
                mode === 'light'
                  ?
                  <MdLightMode className="text-light fs-1" />
                  :
                  <MdDarkMode className="text-light fs-1" />
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
