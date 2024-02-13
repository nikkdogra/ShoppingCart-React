import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import PopUp from './components/PopUp/PopUp';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductContext from './context/ProductsContext';
import CartItemsProvider from './context/CartItemsContext';
import SetPopUpVisibilityContext from './context/SetPopUpVisibilityContext';
import ModeContext from './context/ModeContext';


const App = () => {
  const [products, setProducts] = useState([]);

  const [popUpVisibility, setPopUpVisibility] = useState({ visible: false, id: null });

  const [mode, setMode] = useState('light');

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${products.length}`);
      const data = await response.json();
      setProducts([...products, ...data.products]);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleWindowScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollTop === scrollHeight && products.length < 100) {
      console.log('here');
      fetchProducts();
    }
  }

  useEffect(() => {
    document.body.style.pointerEvents = popUpVisibility.visible ? 'none' : 'auto';
  }, [popUpVisibility]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    }

  }, [products]);

  return (
    <ModeContext.Provider value={mode}>

      <SetPopUpVisibilityContext.Provider value={setPopUpVisibility}>

        {
          popUpVisibility.visible

          &&

          <PopUp product={products.find(product => product.id == popUpVisibility.id)} />
        }

        <Navbar onToggleMode={() => setMode(mode === 'light' ? 'dark' : 'light')} />

        <div className={`page-height ${mode === 'light' ? 'bg-white text-primary' : 'bg-black text-white'} py-5`}>

          <div className="container">

            <ProductContext.Provider value={products}>

              <CartItemsProvider>

                <Outlet />

              </CartItemsProvider>

            </ProductContext.Provider>

          </div>

        </div>

      </SetPopUpVisibilityContext.Provider>

    </ModeContext.Provider>
  )
}

export default App
