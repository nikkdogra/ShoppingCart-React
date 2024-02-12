import { useParams } from 'react-router-dom';
import HomeLinkButton from '../components/HomeLinkButton';
import { useCartItems, useDispatchCartItems } from '../context/CartItemsContext';
import { useContext } from 'react';
import ProductsContext from '../context/ProductsContext';
import SetPopUpVisibilityContext from '../context/SetPopUpVisibilityContext';

const ProductDetail = () => {
  const { id } = useParams();

  const products = useContext(ProductsContext);

  const cartItems = useCartItems();

  const dispatchCartItems = useDispatchCartItems();

  const setPopUpVisibility = useContext(SetPopUpVisibilityContext);

  const inCart = cartItems.hasOwnProperty(id);

  const { title, thumbnail, brand, price, description } = products.find(product => product.id == id);

  const handleAddToCartClick = () => {
    if (inCart) return;
    dispatchCartItems({type: 'add',id: id});
    setPopUpVisibility({visible: true,id: id});
  }

  return (
    <div className='container'>
      <h1 className='text-center'>{title}</h1>

      <div className="row justify-content-evenly mt-5">
        <div className="col-10 col-md-5">
          <img src={thumbnail} className='img-fluid rounded' alt="Product-Image" style={{height: '300px'}}/>
        </div>
        <div className="col-10 col-md-5 mt-3 text-center text-md-start">
          <h3>Model: {title}</h3>
          <h5 className='my-3'>Made By: {brand}</h5>
          <p className='fs-4'>Price: ${price}</p>
          <p>{description}</p>
          <div className="row justify-content-start">
            <div className="col-12 col-md-6">
              <HomeLinkButton>Back To Shop</HomeLinkButton>
            </div>
            <div className="col-12 col-md-6">
              <button className='btn btn-warning mt-3 mt-md-0' onClick={handleAddToCartClick}>{inCart ? <>In Cart</> : <>Add To Cart</>}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;
