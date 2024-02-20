import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import CartItemsProvider from './context/CartItemsContext';
import ModeContext from './context/ModeContext';
import ProductsProvider from './context/ProductsContext';
import PopUpProvider from './context/PopUpContext';
import ErrorProvider from './context/ErrorContext';
import SearchProvider from './context/SearchContext';

const App = () => {

  const [mode, setMode] = useState('light');

  return (
    <ModeContext.Provider value={mode}>

      <ErrorProvider>

        <SearchProvider>

          <ProductsProvider>

            <PopUpProvider>

              <CartItemsProvider>

                <Navbar onToggleMode={() => setMode(mode === 'light' ? 'dark' : 'light')} />

                <div className={`page-height ${mode === 'light' ? 'bg-white text-primary' : 'bg-black text-white'} py-5`}>

                  <div className="container">

                    <Outlet />

                  </div>

                </div>

              </CartItemsProvider>

            </PopUpProvider>

          </ProductsProvider>

        </SearchProvider>

      </ErrorProvider>

    </ModeContext.Provider>
  )
}

export default App
