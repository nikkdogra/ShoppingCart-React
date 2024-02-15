import { useParams } from 'react-router-dom';
import HomeLinkButton from '../components/HomeLinkButton';
import { useCartItems, useDispatchCartItems } from '../context/CartItemsContext';
import { useProducts } from '../context/ProductsContext';
import { useDispatchPopUp } from '../context/PopUpContext';
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();

  const { products } = useProducts();

  const cartItems = useCartItems();

  const dispatchCartItems = useDispatchCartItems();

  const dispatchPopUp = useDispatchPopUp();

  const inCart = cartItems.findIndex(item => item.id == id) !== -1;

  const { title, images, brand, price, description } = products.find(product => product.id == id);

  const [image, setImage] = useState(0);

  const handleAddToCartClick = () => {
    if (inCart) return;
    dispatchPopUp({ type: 'show', id: id });
    dispatchCartItems({ type: 'add', id: id });
  }

  const handleArrowClick = (arrow) => {
    if (arrow === 'left') {
      setImage(image > 0 ? image - 1 : images.length - 1);
    } else {
      setImage(image < images.length - 1 ? image + 1 : 0);
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center'>{title}</h1>

      <div className="row justify-content-evenly mt-5">
        <div className="col-10 col-md-5 position-relative">

          <img src={images[image]} className='img-fluid rounded' alt="Product-Image" style={{ height: '300px', width: '100%' }} />

          <HiArrowSmLeft className='position-absolute fs-1 text-warning top-50' style={{ cursor: 'pointer', left: '5%' }} onClick={() => handleArrowClick('left')} />

          <HiArrowSmRight className='position-absolute fs-1 text-warning top-50' style={{ cursor: 'pointer', right: '5%' }} onClick={() => handleArrowClick('right')} />

          <div className="position-absolute d-flex justify-content-center gap-2 align-items-center w-100" style={{ cursor: 'pointer', bottom: '5%' }}>
            {
              images.map((e, i) => <div key={i} className={`border border-warning rounded-circle ${image === i && 'bg-warning'}`} style={{ width: '12px', height: '12px', cursor: 'pointer' }} onClick={() => setImage(i)}></div>)
            }
          </div>
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
