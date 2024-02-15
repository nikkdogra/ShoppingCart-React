import Product from '../components/Product/Product';
import { useCartItems } from '../context/CartItemsContext';
import Spinner from '../components/Spinner';
import { useProducts } from '../context/ProductsContext';
import { useEffect } from 'react';
import { useError } from '../context/ErrorContext';
import { useSearch } from '../context/SearchContext';

const Home = () => {
    const cartItems = useCartItems();

    const { products, fetchProducts } = useProducts();

    const { error } = useError();

    const {search} = useSearch();

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;

        if (windowHeight + scrollTop === scrollHeight && products.length < 100 && !error && !search) {
            fetchProducts();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [products]);

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
                        inCart={cartItems.findIndex(item => item.id === product.id) != -1}
                    />)
                }
            </div>
            {
                error
                    ?
                    <p className='mt-3 fs-3 fw-bold text-danger text-center'>{error}</p>
                    :
                    products.length < 100
                    &&
                    !search
                    &&
                    <Spinner />
            }
        </>
    )
}

export default Home
