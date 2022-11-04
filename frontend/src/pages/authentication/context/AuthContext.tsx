/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState, createContext, useEffect, ReactNode } from "react";

type ChildrenProps = {
    children: ReactNode
}

// Default state for a user
export const defaultAuthState = {
    userData: null,
    token: null,
    isLoading: false,
    isError: false
}

const AuthProvider = createContext(defaultAuthState)

export const AuthContext: React.FC<ChildrenProps> = ({children}) => {
    const [authState, setAuthState] = useState(defaultAuthState);

    return <AuthProvider.Provider value = {authState}>
        {children}
    </AuthProvider.Provider>
}

// Custom use auth hook
export const useAuth = () => {
    const useAuthContext = useContext(AuthProvider);
    return {authContext: useAuthContext};
}