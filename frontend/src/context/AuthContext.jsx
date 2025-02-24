import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext();

// Handles updates to the authentication state.
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    // Initializes the state of the user to null so that no user
    // is logged in by default.
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // Keep user logged in if the page is refreshed.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);

    console.log('AuthContext state:', state);

    // Makes the authentication state accessible to all child
    // components wrapped inside <AuthContextProvider>.
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}