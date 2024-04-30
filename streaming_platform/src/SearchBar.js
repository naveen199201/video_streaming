import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchVideos } from './redux/slice';
import './VideoSearch.css';
import { Grid } from '@mui/material';

const SearchBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState(null);

    const handleSearch = (query) => {
        dispatch(fetchVideos(query));
        navigate('/home')
    };
    const handleChange = (event) => {
        setQuery(event.target.value);
    }
    return (
        <Grid container xs={12} className="search-container">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for videos..."
                className="search-input"
            /> 
            <button onClick={() => handleSearch(query)} className="search-button">Search</button>
            </Grid>
    )
}

export default SearchBar