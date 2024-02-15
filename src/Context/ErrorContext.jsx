import { createContext, useContext, useState } from "react";

const ErrorContext = createContext(null);

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const showError = (error) => {
        setError(error);
    }

    const removeError = () => {
        setError(null);
    }
    return (
        <ErrorContext.Provider value={{ error, showError, removeError }}>
            {children}
        </ErrorContext.Provider>
    )
}

export const useError = () => {
    return useContext(ErrorContext);
}

export default ErrorProvider;