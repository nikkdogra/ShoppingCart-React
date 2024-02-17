import { useParams } from 'react-router-dom';
import HomeLinkButton from '../components/HomeLinkButton';
import { useCartItems, useDispatchCartItems } from '../context/CartItemsContext';
import { useDispatchPopUp } from '../context/PopUpContext';
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const cartItems = useCartItems();

  const dispatchCartItems = useDispatchCartItems();

  const dispatchPopUp = useDispatchPopUp();

  const inCart = cartItems.findIndex(item => item.id == id) !== -1;

  if (product) {
    product.discount = Math.floor(product.price * (product.discountPercentage / 100))
    product.discountedPrice = Math.floor(product.price - product.discount);
  }

  const [image, setImage] = useState(0);

  const handleAddToCartClick = () => {
    if (inCart) return;
    dispatchPopUp({ type: 'show', id: id });
    dispatchCartItems({ type: 'add', id: id });
  }

  const handleArrowClick = (arrow) => {
    if (arrow === 'left') {
      setImage(image > 0 ? image - 1 : product.images.length - 1);
    } else {
      setImage(image < product.images.length - 1 ? image + 1 : 0);
    }
  }

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(product => setProduct(product));
  }, []);

  return (
    <div className='container'>
      {
        product
        ?
        <>
          <h1 className='text-center'>{product.title}</h1>

          <div className="row justify-content-evenly mt-5">
            <div className="col-10 col-md-5 position-relative">

              <img src={product.images[image]} className='img-fluid rounded' alt="Product-Image" style={{ height: '300px', width: '100%' }} />

              <HiArrowSmLeft className='position-absolute fs-1 text-warning top-50' style={{ cursor: 'pointer', left: '5%' }} onClick={() => handleArrowClick('left')} />

              <HiArrowSmRight className='position-absolute fs-1 text-warning top-50' style={{ cursor: 'pointer', right: '5%' }} onClick={() => handleArrowClick('right')} />

              <div className="position-absolute d-flex justify-content-center gap-2 align-items-center w-100" style={{ cursor: 'pointer', bottom: '5%' }}>
                {
                  product.images.map((e, i) => <div key={i} className={`border border-warning rounded-circle ${image === i && 'bg-warning'}`} style={{ width: '12px', height: '12px', cursor: 'pointer' }} onClick={() => setImage(i)}></div>)
                }
              </div>
            </div>
            <div className="col-10 col-md-5 mt-3 text-center text-md-start">
              <h3>Model: {product.title}</h3>
              <h5 className='my-3'>Made By: {product.brand}</h5>
              <p>Price: ${product.price}</p>
              <p>Discount: ${product.discount}</p>
              <p className='fs-4'>Discounted Price: ${product.discountedPrice}</p>
              <p>{product.description}</p>
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
        </>
        :
        <Spinner/>
      }
    </div>
  )
}

export default ProductDetail;
