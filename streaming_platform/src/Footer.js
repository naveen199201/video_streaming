import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function SimpleBottomNavigation() {
    const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%',border: 6 ,borderColor: 'primary.main', borderRadius: 2,position:'fixed',bottom:0  }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Search" onClick={() => navigate(`/home`)} icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction label="Search" onClick={() => navigate(`/search`)}  icon={<SearchIcon />} />
        <BottomNavigationAction label="Recents" onClick={() => navigate(`/upload`)} icon={<AddIcon />} />
        <BottomNavigationAction label="" onClick={() => navigate(`/profile`)} icon={<AccountCircleOutlinedIcon />} />

        
      </BottomNavigation>
    </Box>
  );
}
