import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useContext, useState } from 'react';
import ModeContext from '../../context/ModeContext';

const Navbar = ({ onToggleMode }) => {
  const mode = useContext(ModeContext);
  const location = useLocation().pathname;
  const [search, setSearch] = useState('');
  return (
    <nav className={`navbar navbar-expand-lg bg-${mode === 'light' ? 'primary' : 'body-tertiary'} position-sticky top-0 z-1`} data-bs-theme={mode}>

      <div className="container-fluid px-5">

        <Link to='/' className="navbar-brand"><span className={`badge px-3 py-2 bg-white text-${mode === 'light' ? 'primary' : 'black'}`}>MY SHOP</span></Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to='/' className="nav-link active text-white" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to='/cart' className="nav-link text-white">Cart</Link>
            </li>
          </ul>
          <div className='d-flex flex-column-reverse flex-lg-row gap-lg-3'>
            {
              location === '/'
              &&
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className="btn btn-outline-light" type="submit">Search</button>
              </form>
            }

            <div className='d-flex gap-2'>
              <p className='text-white d-block d-lg-none pt-1'>{mode} Mode</p>
              {
                mode === 'light'
                  ?
                  <MdLightMode className={`text-light fs-1 ${styles.mode}`} onClick={onToggleMode} />
                  :
                  <MdDarkMode className={`text-light fs-1 ${styles.mode}`} onClick={onToggleMode} />
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
