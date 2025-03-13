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
    const [state, dispatch] = useReducer(authReducer, null, () => {
        const user = localStorage.getItem('user');
        return { user: user ? JSON.parse(user) : null };
    });

    console.log('AuthContext state:', state);

    // Makes the authentication state accessible to all child
    // components wrapped inside <AuthContextProvider>.
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}