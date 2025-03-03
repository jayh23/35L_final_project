import { useAuthContext } from './useAuthContext';

// Custom hook to handle user logout functionality.
export const useLogout = () => {
    // Manage updating the authentication state.
    const { dispatch } = useAuthContext();
    
    const logout = () => {
        // Remove user from local storage to clear the session.
        localStorage.removeItem('user');
        
        // Dispatch logout action to update authentication context.
        dispatch({ type: 'LOGOUT' });
    }

    return { logout }
}