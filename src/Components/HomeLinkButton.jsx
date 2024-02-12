import { useNavigate } from "react-router-dom"

const HomeLinkButton = ({ children }) => {
    const navigate = useNavigate();
    return (
        <button className='btn btn-primary' onClick={() => navigate('/')}>{children}</button>
    )
}

export default HomeLinkButton
