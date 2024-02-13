import { useContext } from 'react';
import ModeContext from '../context/ModeContext';

const Spinner = () => {
    const mode = useContext(ModeContext);
    return (
        <div className="mt-5 text-center">
            <div className={`spinner-border text-${mode === 'light' ? 'primary' : 'light'}`} role="status" style={{width: '50px',height: '50px'}}></div>
        </div>
    )
}

export default Spinner
