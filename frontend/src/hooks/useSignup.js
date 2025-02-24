import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// Custom hook to handle user signin functionality.
export const useSignup = () => {
    // States to manage loading and error states.
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Manage updating the authentication state.
    const { dispatch } = useAuthContext();

    const signup = async (username, password) => {
        setIsLoading(true);
        setError(null);

        // Set a POST request to the signup API endpoint.
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        // Parse the JSON response.
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        // Handle successful signup.
        if (response.ok) {
            // Save the user to local storage.
            localStorage.setItem('user', JSON.stringify(json));

            // Update the authentication context with the logged-in user.
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    }

    // Return the signup function and state variables for use in components.
    return { signup, isLoading, error };
}