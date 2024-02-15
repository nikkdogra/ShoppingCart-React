import { createContext, useContext, useEffect, useReducer } from "react";
import PopUp from '../components/PopUp/PopUp';
import { useProducts } from "./ProductsContext";

const PopUpContext = createContext(null);
const DispatchPopUpContext = createContext(null);

const PopUpProvider = ({ children }) => {
    const { products } = useProducts();

    const popUpReducer = (popUp, action) => {
        switch (action.type) {
            case 'show': {
                return { visible: true, product: products.find(product => product.id == action.id) };
            }

            case 'remove': {
                return { visible: false, product: null };
            }

            default: return popUp;
        }
    }

    const [popUp, dispatchPopUp] = useReducer(popUpReducer, { visible: false, product: null });

    useEffect(() => {
        document.body.style.pointerEvents = popUp.visible ? 'none' : 'auto';
    }, [popUp.visible]);
    return (
        <PopUpContext.Provider value={popUp}>
            <DispatchPopUpContext.Provider value={dispatchPopUp}>
                {
                    popUp.visible
                    &&
                    <PopUp />
                }
                {children}
            </DispatchPopUpContext.Provider>
        </PopUpContext.Provider>
    )
}

export const usePopUp = () => {
    return useContext(PopUpContext);
}

export const useDispatchPopUp = () => {
    return useContext(DispatchPopUpContext);
}

export default PopUpProvider;