import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Game from './pages/Game'
import Profile from './pages/Profile'
import Friends from './pages/Friends'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SearchResults from './pages/SearchResults'
import GenrePage from './pages/GenrePage';  // Import the new GenrePage


function App() {
    const { user } = useAuthContext()

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/friends" element={user ? <Friends /> : <Navigate to="/login" />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                <Route path="/games/:gameId" element={user ? <Game /> : <Navigate to="/" />} />
                {/* Stopgap fix; game pages don't display when logged out*/}
                <Route path="/search" element={<SearchResults />} />
                <Route path="/genre/:genreName" element={<GenrePage />} />

            </Routes>

        </>
    )
}
 
export default App
