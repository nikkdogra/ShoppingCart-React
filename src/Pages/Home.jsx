import { useContext } from 'react';
import Product from '../components/Product/Product';
import ProductContext from '../context/ProductsContext';
import { useCartItems } from '../context/CartItemsContext';
import Spinner from '../components/Spinner';

const Home = () => {
    const products = useContext(ProductContext);
    const cartItems = useCartItems();
    return (
        <>
            <h1 className='text-center'>Our Products</h1>
            <div className="d-flex flex-wrap justify-content-center mt-3">
                {
                    products.map(product => <Product
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        src={product.thumbnail}
                        price={product.price}
                        inCart={cartItems.hasOwnProperty(product.id)}
                    />)
                }
            </div>
            {
                products.length < 100
                &&
                <Spinner />
            }
        </>
    )
}

export default Home
