import { createContext, useContext, useEffect, useState } from "react";
import { useError } from "./ErrorContext";

const ProductsContext = createContext(null);

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const { showError, removeError } = useError();

    const fetchProducts = async () => {
        removeError();

        try {
            const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${products.length}`);

            if (!response.ok) {
                showError('Some Error Occurred! Try Later');
                return;
            }

            const data = await response.json();

            setProducts([...products, ...data.products]);
        }
        catch (e) {
            showError('Check Your Internet Connection!');
        }
    }

    const searchProducts = async (search) => {
        removeError();

        setProducts([]);

        const url = 'https://dummyjson.com/products' + (search ? `/search?q=${search}` : '?limit=10');

        const response = await fetch(url);

        const data = await response.json();

        setProducts(data.products);

        if (!data.products.length) {
            showError('No Search Found!');
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, fetchProducts, searchProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => {
    return useContext(ProductsContext);
}

export default ProductsProvider;

