import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { useProducts } from "./ProductsContext";

const CartItemsContext = createContext(null);
const DispatchCartItemsContext = createContext(null);

const CartItemsProvider = ({ children }) => {
    const { products } = useProducts();

    const cartItemsReducer = (cartItems, action) => {
        const index = cartItems.findIndex(item => item.id == action.id);
        const newCartItems = [...cartItems];

        switch (action.type) {

            case 'add': {

                if (index !== -1) {
                    newCartItems.splice(index, 1, { ...cartItems[index], count: cartItems[index].count + 1 });

                    return newCartItems;
                }

                const product = products.find(product => product.id == action.id);

                return [...cartItems, { ...product, count: 1 }];
            }

            case 'remove': {

                if (cartItems[index].count - 1 <= 0) {
                    return cartItems.filter(item => item.id != action.id);
                }

                newCartItems.splice(index, 1, { ...cartItems[index], count: cartItems[index].count - 1 });

                return newCartItems;
            }

            case 'clear': {
                return [];
            }

            case 'stored_items': {
                return action.storedItems;
            }

            default: return cartItems;
        }

    }

    const [cartItems, dispatchCartItems] = useReducer(cartItemsReducer, []);

    const isInitialRender = useRef(true);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('cart-items'));
        if (storedItems && isInitialRender.current) {
            dispatchCartItems({ type: 'stored_items', storedItems: storedItems });
            isInitialRender.current = false;
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart-items', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartItemsContext.Provider value={cartItems}>
            <DispatchCartItemsContext.Provider value={dispatchCartItems}>
                {children}
            </DispatchCartItemsContext.Provider>
        </CartItemsContext.Provider>
    )
}

export const useCartItems = () => {
    return useContext(CartItemsContext);
}

export const useDispatchCartItems = () => {
    return useContext(DispatchCartItemsContext);
}

export default CartItemsProvider;


