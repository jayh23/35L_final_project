import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Game from './pages/Game'
import Profile from './pages/Profile'
import Friends from './pages/Friends'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
    const { user } = useAuthContext()

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/friends" element={user ? <Friends /> : <Navigate to="/login" />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
                <Route path="/games/:gameId" element={<Game />} />
            </Routes>

        </>
    )
}
 
export default App
