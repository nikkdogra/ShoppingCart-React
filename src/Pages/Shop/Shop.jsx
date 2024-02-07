import styles from './Shop.module.css';
import Product from '../../Components/Product/Product';
import { useContext } from 'react';
import ProductsContext from '../../Context/ProductsContext';

const Shop = () => {
    const products = useContext(ProductsContext);
    return (
        <>
            <h1 className={styles.heading}>My Shop</h1>
            <div className={styles.container}>
                {
                    products.map(product => <Product key={product.id} id={product.id} src={product.thumbnail} title={product.title} price={product.price} />)
                }
            </div>
        </>
    )
}

export default Shop
