import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
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
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
            </Routes>

        </>
    )
}

export default App
