import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import './index.css'
import Root from './Pages/Root/Root.jsx';
import Shop from './Pages/Shop/Shop.jsx';
import Cart from './Pages/Cart/Cart.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Shop/>
      },
      {
        path: '/cart',
        element: <Cart/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
