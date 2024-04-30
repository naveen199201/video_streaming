import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";
import Player from "./Player";
import store from "./Store";
import { Provider } from 'react-redux'
import VideoUpload from "./VideoUpload";
import Feed from "./Feed";
import Profile from "./Profile";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VideoDisplay from "./VideoDisplay";
import SearchBar from "./SearchBar";

const theme = createTheme(); // Create your Material-UI theme here


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/videodisplay" element={<VideoDisplay />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<AuthorizedRoute><Home /></AuthorizedRoute>} />
            <Route path="/feed" element={<AuthorizedRoute><Feed /></AuthorizedRoute>} />
            <Route path="/videos/:videoId/" element={<AuthorizedRoute><Player /></AuthorizedRoute>} />
            <Route path="/profile" element={<AuthorizedRoute><Profile /></AuthorizedRoute>} />
            <Route path="/upload" element={<AuthorizedRoute><VideoUpload /></AuthorizedRoute>} />
            <Route path="/search" element={<AuthorizedRoute><SearchBar /></AuthorizedRoute>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

const AuthorizedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (!isAuthenticated) {
    alert("Please login ");
    return <Login />
  }
  return children;
};

export default App;
