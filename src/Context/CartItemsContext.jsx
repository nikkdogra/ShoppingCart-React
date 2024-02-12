import { createContext, useContext, useReducer } from "react";

const CartItemsContext = createContext(null);
const DispatchCartItemsContext = createContext(null);

const cartItemsReducer = (cartItems, action) => {

    switch (action.type) {
        case 'add': {
            if(cartItems.hasOwnProperty(action.id)){
                return {...cartItems,[action.id]: cartItems[action.id] + 1};
            }
            return {...cartItems,[action.id]: 1};
        }

        case 'remove': {
            if(cartItems[action.id] - 1 <= 0){
                const newCartItems = {...cartItems};
                delete newCartItems[action.id];
                return newCartItems;
            }
            return {...cartItems,[action.id]: cartItems[action.id] - 1}
        }

        case 'clear': {
            return {};
        }
        
        default: return cartItems;
    }

}

const CartItemsProvider = ({ children }) => {
    const [cartItems, dispatchCartItems] = useReducer(cartItemsReducer, {});
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


