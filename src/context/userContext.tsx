import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const STORAGE_KEY = 'userContextContent';

type UserContext = {
    user: string;
    setUser: (newUser: string) => void;
}

export const userContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(localStorage?.getItem(STORAGE_KEY) || '');

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, user);
    }, [user]);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => useContext(userContext);
