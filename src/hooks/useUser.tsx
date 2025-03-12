'use client';

import { parseCookies } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextProps {
    user:any;
}

interface UserProviderProps {
    children:ReactNode;
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({children}:UserProviderProps) {
    const [user, setUser] = useState(() => {
        const {'user-token': storedUser} = parseCookies();
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    return context
}