import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <Button onclick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}

export default Logout